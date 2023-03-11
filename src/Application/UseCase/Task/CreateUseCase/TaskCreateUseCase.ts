import { InvalidData } from '../../../../../framework'
import {
  AccountService,
  Task,
  TaskItem,
  TaskItemStatusEnum,
  TaskService,
  TaskSettings,
  TaskStatusEnum,
  CampaignService,
  Campaign
} from '../../../../Domain'
import { ITaskProducer } from '../../../Event'
import { ITaskCreatePayloadDto } from './ITaskCreatePayloadDto'

export class TaskCreateUseCase {
  constructor(
    private readonly accountId: string,
    private readonly accountService: AccountService,
    private readonly taskService: TaskService,
    private readonly taskEventProducer: ITaskProducer
  ) {}

  public async execute(dto: ITaskCreatePayloadDto): Promise<void> {
    const account = await this.accountService.getOneById(this.accountId)

    if (!account.getConfigs().getZApiInstance() || !account.getConfigs().getZApiToken())
      throw new InvalidData('Account does not have [Z-API] instance or token defined.')

    const taskItems = dto.items
      .filter(item => item.row !== 0)
      .map(item => new TaskItem(item.row + 1, TaskItemStatusEnum.PENDING, item.rawData))

    const task = new Task(
      account.getId(),
      TaskStatusEnum.PENDING,
      new TaskSettings(dto.message, dto.processItemInterval),
      dto.type
    ).setItems(taskItems)

    await this.taskService.save(task)

    this.taskEventProducer.taskCreated({
      payload: { taskId: task.getId(), accountId: account.getId() }
    })

    // if (dto.hasOwnProperty('saveCampaign') && dto.saveCampaign)
    //   await this.campaignService.save(new Campaign(account.getId()).setTaskItems(task.getItems()))
  }
}
