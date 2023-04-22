import { EntityDataMapperContract } from '#framework'
import { Account, Configs as DomainConfigs } from '#domain'
import { AccountEntity } from '../Entity'
import { Configs } from '../ValueObject'

export class AccountDataMapper extends EntityDataMapperContract<Account, AccountEntity> {
  toDomain(entity: AccountEntity): Account {
    return new Account(
      entity.name,
      entity.email,
      entity.password,
      new DomainConfigs(entity.configs.zApiInstance, entity.configs.zApiToken),
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Account): AccountEntity {
    return new AccountEntity(
      domain.getId(),
      domain.getName(),
      domain.getEmail(),
      domain.getEncodedPassword(),
      new Configs(domain.getConfigs().getZApiInstance(), domain.getConfigs().getZApiToken())
    )
  }
}
