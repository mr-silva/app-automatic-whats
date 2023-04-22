import { IEntityDataMapper } from '../Interface/IEntityDataMapper'

export abstract class EntityDataMapperContract<TDomainEntity, TDaoEntity>
  implements IEntityDataMapper<TDomainEntity, TDaoEntity>
{
  abstract toDomain(entity: TDaoEntity): TDomainEntity

  abstract toDaoEntity(domain: TDomainEntity): TDaoEntity

  toDaoEntityMany(domains: TDomainEntity[]): TDaoEntity[] {
    return domains.map(domain => this.toDaoEntity(domain))
  }

  toDomainMany(entities: TDaoEntity[]): TDomainEntity[] {
    return entities.map(entity => this.toDomain(entity))
  }
}
