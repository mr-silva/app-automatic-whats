import { AccountService, TaskItemStatusEnum, TaskService } from '#domain'
import { IZApiAppService } from '../../../Service'
import { ITaskItemProcessPayloadDto } from './ITaskItemProcessPayloadDto'

export class TaskItemProcessUseCase {
  constructor(
    private readonly accountService: AccountService,
    private readonly taskService: TaskService,
    private readonly zApiService: IZApiAppService
  ) {}

  public async execute(dto: ITaskItemProcessPayloadDto): Promise<void> {
    const account = await this.accountService.getOneById(dto.accountId)

    const task = await this.taskService.getOneById(dto.taskId)

    const taskItem = task.getItems().find(item => item.getId() === dto.taskItemId)

    if (!taskItem) return

    try {
      await this.zApiService
        .setProfileData(
          account.getConfigs().getZApiInstance()!,
          account.getConfigs().getZApiToken()!
        )
        .sendMessage(task.getSettings().getMessage(), taskItem.getRawData()!)

      taskItem.setStatus(TaskItemStatusEnum.DONE).setNote('Successfully executed.')
    } catch (error) {
      taskItem.setStatus(TaskItemStatusEnum.ERROR).setNote('Error sending message.')
    }

    task.getItems().forEach(item => {
      if (item.getId() === taskItem.getId())
        item.setStatus(taskItem.getStatus()).setNote(taskItem.getNote()!)
    })

    await this.taskService.save(task)
  }
}
