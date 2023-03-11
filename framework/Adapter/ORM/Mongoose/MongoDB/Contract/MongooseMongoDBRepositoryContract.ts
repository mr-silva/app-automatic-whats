import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose'
import { IEntityDataMapper } from '../../../../../DataMapper'
import {
  DataNotFound,
  IRepository,
  PagedList,
  PagedListFiltersDTO,
  SearchableFilterDTO
} from '../../../../../Domain'
import { IFieldsToSort } from '../Interface'

export abstract class MongooseMongoDBRepositoryContract<TDomainEntity, TDaoEntity>
  implements IRepository<TDomainEntity>
{
  /**
   * Model do mongoose.
   *
   * @template TDaoEntity
   *
   * @property {Model<TDaoEntity>} model
   */
  protected readonly model: Model<TDaoEntity>

  /**
   * Conversor dos dados entre banco de dados e domínio.
   *
   * @template TDomainEntity
   * @template TDaoEntity
   *
   * @property {IEntityDataMapper<TDomainEntity, TDaoEntity>} dataMapper
   */
  protected readonly dataMapper: IEntityDataMapper<TDomainEntity, TDaoEntity>

  constructor(
    model: Model<TDaoEntity>,
    dataMapper: IEntityDataMapper<TDomainEntity, any>,
    protected dataNotFoundException: DataNotFound,
    protected accountId?: string | null
  ) {
    this.model = model
    this.dataMapper = dataMapper

    if (!dataNotFoundException) this.dataNotFoundException = new DataNotFound()
  }

  /**
   * @inheritDoc
   */
  public async getPagedList<TFilter extends PagedListFiltersDTO = PagedListFiltersDTO>(
    filters: TFilter
  ): Promise<PagedList<TDomainEntity>> {
    const query = this.applyAccountIdFilter(
      this.applySearch(this.customToGetAllOrList({}, filters), filters)
    )

    const paginationAndOrderBy = this.applyOrderBy(this.applyPaginator({}, filters), filters)

    return new PagedList(
      (await this.model.find(query, {}, paginationAndOrderBy)).map(entity =>
        this.dataMapper.toDomain(entity)
      ),
      await this.model.countDocuments(query)
    )
  }

  /**
   * @inheritDoc
   */
  public async getOneById(id: string): Promise<TDomainEntity> {
    const query = this.applyAccountIdFilter({
      $and: [{ id }]
    })
    const entity = await this.model.findOne(query)

    if (!entity) throw this.dataNotFoundException

    return this.dataMapper.toDomain(entity)
  }

  /**
   * @inheritDoc
   */
  public async create(entity: TDomainEntity): Promise<TDomainEntity> {
    try {
      const result = await this.model.create(this.dataMapper.toDaoEntity(entity))

      return this.dataMapper.toDomain(result)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  /**
   * Cria ou atualiza um registro com base na entidade.
   *
   * @warning Necessário reimplementação pois a descoberta de "chave primária" ainda não foi
   * padronizada no framework.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   *
   * @example
   *
   * try {
   *   if (!entity.getId()) return await this.create(entity)
   *
   *   await this.update(entity, id)
   *   return await this.getOneById(id)
   * } catch (e) {
   *   console.error(e)
   *   throw e
   * }
   *
   * @returns {Promise<TDomainEntity>}
   */
  public abstract save(entity: TDomainEntity): Promise<TDomainEntity>

  /**
   * @inheritDoc
   */
  public async delete(id: string): Promise<boolean> {
    try {
      const query = this.applyAccountIdFilter({
        $and: [{ id }]
      })

      await this.model.findOneAndDelete(query)

      return true
    } catch (e) {
      return false
    }
  }

  /**
   * @inheritDoc
   */
  public async update(entity: TDomainEntity, id: string): Promise<boolean> {
    try {
      const query = this.applyAccountIdFilter({
        $and: [{ id }]
      })

      const result = await this.model.updateOne(
        query,
        this.dataMapper.toDaoEntity(entity) as UpdateQuery<TDaoEntity>
      )

      return !!result.modifiedCount
    } catch (e) {
      return false
    }
  }

  /**
   * Aplica paginação na 'query'.
   *
   * @template TDaoEntity
   *
   * @param {QueryOptions} query
   * @param {PagedListFiltersDTO} filters
   *
   * @returns {QueryOptions}
   */
  public applyPaginator(query: QueryOptions, filters: PagedListFiltersDTO): QueryOptions {
    const skip = (filters.getPage() - 1) * filters.getSize()
    const limit = filters.getSize()

    query = {
      skip,
      limit
    }

    return query
  }

  /**
   * Permite aplicar modificações na 'query' do método getAll().
   *
   * @template TDaoEntity
   *
   * @param {TFilter} filters
   * @param {FindManyOptions<TDaoEntity>} query
   *
   * @returns {FindManyOptions<TDaoEntity>}
   */
  protected customToGetAllOrList<TFilter extends SearchableFilterDTO | PagedListFiltersDTO>(
    query: FilterQuery<TDaoEntity>,
    filters: TFilter
  ): FilterQuery<TDaoEntity> {
    return query
  }

  /**
   * Aplica na 'query' as condições para o filtro de campo de busca.
   *
   * @template TDaoEntity
   *
   * @param {SearchableFilterDTO} filters
   * @param {FilterQuery<TDaoEntity>} query
   *
   * @returns {FilterQuery<TDaoEntity>}
   */
  protected applySearch(
    query: FilterQuery<TDaoEntity>,
    filters: SearchableFilterDTO
  ): QueryOptions {
    const queryFilter = filters.getQuery()

    if (!queryFilter || !this.getFieldsToSearch().length) return query

    const fieldsToWhere = []
    for (const field of this.getFieldsToSearch()) {
      const nameReg = new RegExp(queryFilter, 'i')
      fieldsToWhere.push({ [field]: { $regex: nameReg } })
    }

    if (fieldsToWhere.length) query.$or = fieldsToWhere as Array<FilterQuery<TDaoEntity>>

    return query
  }

  /**
   * Aplica na 'query' a informação de accountId.
   *
   * @template TDaoEntity
   *
   * @param {PagedListFiltersDTO} filters
   * @param {FilterQuery<TDaoEntity>} query
   *
   * @returns {FilterQuery<TDaoEntity>}
   */
  protected applyAccountIdFilter(query: FilterQuery<TDaoEntity>): FilterQuery<TDaoEntity> {
    const hasAccountIdFilter =
      query.$and && query.$and.some(field => typeof field['accountId'] !== 'undefined')

    if (this.accountId && this.hasAccountIdColumn() && !hasAccountIdFilter) {
      query['$and'] = [...(query['$and'] || []), { accountId: this.accountId }]
    }

    return query
  }

  /**
   * Aplica na 'query' as condições para a ordernação da listagem.
   *
   * @template TDaoEntity
   *
   * @param {TFilter} filters
   * @param {FilterQuery<TDaoEntity>} query
   *
   * @returns {FilterQuery<TDaoEntity>}
   */
  public applyOrderBy<TFilter extends SearchableFilterDTO | PagedListFiltersDTO>(
    query: QueryOptions,
    filters: TFilter
  ): QueryOptions {
    if (!Object.keys(this.getFieldsToSort()).length) return query

    query = {
      sort: this.getFieldsToSort()
    }

    return query
  }

  /**
   * Retorna a página para a query.
   *
   * @returns {string[]}
   */
  protected getFieldsToSearch(): string[] {
    return []
  }

  /**
   * Retorna os campos para ordenar a listagem.
   *
   * @returns {IFieldsToSort}
   */
  protected getFieldsToSort(): IFieldsToSort {
    return {}
  }

  /**
   * @inheritDoc
   */
  public async getAll<TFilter extends SearchableFilterDTO = SearchableFilterDTO>(
    filters: TFilter
  ): Promise<TDomainEntity[]> {
    const query = this.applyAccountIdFilter(
      this.applySearch(this.customToGetAllOrList({}, filters), filters)
    )

    const orderBy = this.applyOrderBy({}, filters)

    return (await this.model.find(query, {}, orderBy)).map(e => this.dataMapper.toDomain(e))
  }

  public setAccountId(accountId: string | null): this {
    this.accountId = accountId
    return this
  }

  protected abstract hasAccountIdColumn(): boolean
}
