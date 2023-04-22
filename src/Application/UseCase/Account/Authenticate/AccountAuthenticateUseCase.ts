import { AccountService, EncodedToken } from '#domain'
import { IAccountAuthenticatePayloadDto } from './IAccountAuthenticatePayloadDto'

export class AccountAuthenticateUseCase {
  constructor(private readonly accountService: AccountService) {}

  public async execute(dto: IAccountAuthenticatePayloadDto): Promise<EncodedToken> {
    const account = await this.accountService.getOneByEmailAndPassword(dto.email, dto.password)

    const encodedToken = EncodedToken.encode({
      account: {
        id: account.getId(),
        name: account.getName()
      }
    })

    return encodedToken
  }
}
