import { EntityDataMapperContract } from '#framework'
import { Account, Configs as DomainConfigs } from '#domain'
import { AccountEntity } from '../Entity'
import { Configs } from '../ValueObject'

export class AccountDataMapper extends EntityDataMapperContract<Account, AccountEntity> {
  toDomain(entity: AccountEntity): Account {
    return new Account(
      new DomainConfigs(entity.configs.zApiInstance, entity.configs.zApiToken),
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Account): AccountEntity {
    return new AccountEntity(
      domain.getId(),
      new Configs(domain.getConfigs().getZApiInstance(), domain.getConfigs().getZApiToken())
    )
  }
}
