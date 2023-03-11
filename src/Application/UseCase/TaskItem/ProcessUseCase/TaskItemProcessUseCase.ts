import { TaskItemStatusEnum, TaskService } from '../../../../Domain'
import { IZApiAppService } from '../../../Service'
import { ITaskItemProcessPayloadDto } from './ITaskItemProcessPayloadDto'

export class TaskItemProcessUseCase {
  constructor(
    private readonly taskService: TaskService,
    private readonly zApiService: IZApiAppService
  ) {}

  public async execute(dto: ITaskItemProcessPayloadDto): Promise<void> {
    const task = await this.taskService.getOneById(dto.taskId)

    const taskItem = task.getTaskItems().find(item => item.getId() === dto.taskItemId)

    if (!taskItem) return

    try {
      await this.zApiService.sendMessage(task.getSettings().getMessage(), taskItem.getRawData()!)

      taskItem.setStatus(TaskItemStatusEnum.DONE).setNote('Successfully executed.')
    } catch (error) {
      taskItem.setStatus(TaskItemStatusEnum.ERROR).setNote('Error sending message.')
    }

    task.getTaskItems().forEach(item => {
      if (item.getId() === taskItem.getId())
        item.setStatus(taskItem.getStatus()).setNote(taskItem.getNote()!)
    })

    await this.taskService.save(task)
  }
}
