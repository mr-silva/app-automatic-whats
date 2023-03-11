import { RedisClientType } from 'redis'
import { promisify } from 'util'
import { IEntityDataMapper } from '../../../DataMapper'
import {
  DataNotFound,
  PagedListFiltersDTO,
  SearchableFilterDTO,
  IRepository,
  PagedList
} from '../../../Domain'
import { RedisBaseEntity } from '../Entity/RedisBaseEntity'

export abstract class RedisClientRepositoryContract<TDomainValue, TDaoValue extends RedisBaseEntity>
  implements IRepository<TDomainValue>
{
  protected deleteKey: (key: string) => Promise<number>
  protected getKeys: (pattern: string) => Promise<string[]>
  protected getKeyValue: (key: string) => Promise<string>
  protected setKey: (key: string, value: string, mode: string, duration: number) => Promise<any>

  constructor(
    protected readonly repository: RedisClientType,
    protected readonly dataMapper: IEntityDataMapper<TDomainValue, TDaoValue>,
    protected accountId: string | null,
    protected dataNotFoundException?: DataNotFound
  ) {
    if (!dataNotFoundException) this.dataNotFoundException = new DataNotFound()

    this.deleteKey = promisify(this.repository.del).bind(this.repository)
    this.getKeys = promisify(this.repository.keys).bind(this.repository)
    this.getKeyValue = promisify(this.repository.get).bind(this.repository)
    this.setKey = promisify(this.repository.set).bind(this.repository)
  }

  /**
   * @inheritDoc
   */
  public async getPagedList<TFilter extends PagedListFiltersDTO = PagedListFiltersDTO>(
    filters: TFilter
  ): Promise<PagedList<TDomainValue>> {
    const items = await this.getAll(filters)

    return new PagedList(items, items.length)
  }

  /**
   * @inheritDoc
   */
  public async getAll<TFilter extends SearchableFilterDTO = SearchableFilterDTO>(
    filters: TFilter
  ): Promise<TDomainValue[]> {
    const keyPrefix = this.getKeyPrefix()

    const result = await this.getKeys(`${keyPrefix}${filters}`)

    const items: TDaoValue[] = []
    for (const key of result) {
      const item = await this.getKeyValue(key)

      if (!item) continue

      items.push(JSON.parse(item))
    }

    return items.map(item => this.dataMapper.toDomain(item))
  }

  /**
   * @inheritDoc
   */
  public async getOneById(id: string): Promise<TDomainValue> {
    const keyPrefix = this.getKeyPrefix()

    const result = await this.getKeys(`${keyPrefix}*${id}*`)

    const items: TDaoValue[] = []
    for (const key of result) {
      const item = await this.getKeyValue(key)

      if (!item) continue

      items.push(JSON.parse(item))
    }

    if (!items.length) throw this.dataNotFoundException

    return this.dataMapper.toDomain(items[0])
  }

  /**
   * @inheritDoc
   */
  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.getOneById(id)

      const entity = this.dataMapper.toDaoEntity(result)

      await this.deleteKey(entity.getRedisKey())

      return true
    } catch (error) {
      return false
    }
  }

  /**
   * @inheritDoc
   */
  public async create(domain: TDomainValue): Promise<TDomainValue> {
    const entity = this.dataMapper.toDaoEntity(domain)

    await this.setKey(
      `${this.getKeyPrefix()}.${entity.getRedisKey()}`,
      JSON.stringify(entity),
      'EX',
      this.getSecondsToExpire(entity.getExpirationDate())
    )

    return domain
  }

  /**
   * @inheritDoc
   */
  public async save(entity: TDomainValue): Promise<TDomainValue> {
    return this.create(entity)
  }

  /**
   * @inheritDoc
   */
  public async update(entity: TDomainValue, conditions: string | {}): Promise<any> {
    await this.create(entity)
  }

  public setAccountId(accountId: string): this {
    this.accountId = accountId
    return this
  }

  protected getSecondsToExpire(expirationDate?: Date): number {
    if (!!expirationDate) {
      const localDate = new Date(
        new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      )
      const secondsToExpire = (expirationDate.getTime() - localDate.getTime()) / 1000

      return Math.min(secondsToExpire, this.getDefaultExpirationInSeconds())
    }

    return this.getDefaultExpirationInSeconds()
  }

  protected getDefaultExpirationInSeconds(): number {
    return 60 * 60 * 6 // 6 hours
  }

  protected abstract getKeyPrefix(): string
}
