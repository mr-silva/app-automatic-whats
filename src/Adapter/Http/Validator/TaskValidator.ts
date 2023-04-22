import { JoiSchemaValidatorContract } from '#framework'
import Joi, { Schema } from 'joi'
import { TaskTypeEnum } from '#domain'
import { ITaskCreatePayloadDto } from '#application'

export class TaskValidator extends JoiSchemaValidatorContract {
  private createSchema: Schema
  private phoneSchema: Schema
  private emailSchema: Schema

  constructor() {
    super()

    this.phoneSchema = Joi.object({
      nome: Joi.string().required(),
      numero: Joi.string().required()
    }).options({ allowUnknown: true })

    this.emailSchema = Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().required()
    }).options({ allowUnknown: true })

    this.createSchema = Joi.object({
      message: Joi.string().required(),
      type: Joi.string()
        .allow(...Object.values(TaskTypeEnum))
        .required(),
      items: Joi.array()
        .items(
          Joi.object({
            row: Joi.number().required().min(0),
            rawData: Joi.alternatives().conditional('type', [
              {
                is: 'EMAIL',
                then: this.emailSchema,
                otherwise: this.phoneSchema
              }
            ])
          })
        )
        .min(1)
        .required()
    })
  }

  public async validateCreatePayload(payload: ITaskCreatePayloadDto): Promise<void> {
    return this.validateBySchema(payload, this.createSchema)
  }
}
