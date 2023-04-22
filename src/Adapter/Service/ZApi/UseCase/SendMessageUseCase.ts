import { InvalidDataException } from '#framework'
import { MessageProvider } from '../Provider'
import { IMessageCreateDto } from '../Entity'

export class SendMessageUseCase {
  constructor(private readonly messageProvider: MessageProvider) {}

  public async execute(campaignMessage: string, contactPayload: IMessageCreateDto): Promise<void> {
    if (!contactPayload.numero) throw new InvalidDataException('Task Item does not have number.')

    const messageVariablesToUse = [...campaignMessage.matchAll(/{{(.*?)}}/gm)].flatMap(
      variable => variable[1]
    )

    let message = campaignMessage
    for (const variable of messageVariablesToUse) {
      if (!message) message = campaignMessage

      const messageVariableKey = Object.keys(contactPayload).find(key => key === variable)

      if (!messageVariableKey) continue

      message = message.replace(`{{${messageVariableKey}}}`, contactPayload[messageVariableKey])
    }

    await this.messageProvider.createMessage(contactPayload.numero, message!)
  }
}
