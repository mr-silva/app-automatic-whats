import { TaskService, TaskStatusEnum } from '../../../../Domain'
import { ITaskItemProducer } from '../../../Event'
import { ITaskProcessPayloadDto } from './ITaskProcessPayloadDto'

export class TaskProcessUseCase {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskItemEventProducer: ITaskItemProducer
  ) {}

  public async execute(dto: ITaskProcessPayloadDto): Promise<void> {
    const task = await this.taskService.getOneById(dto.taskId)

    task.setStatus(TaskStatusEnum.PROCESSING)

    await this.taskService.save(task)

    task.getTaskItems().forEach((item, i) => {
      const interval = task.getSettings().getProcessItemInterval() * i + 1

      setTimeout(() => this.processItem(item.getId(), task.getId()), interval)
    })

    task.setStatus(TaskStatusEnum.FINISHED)

    await this.taskService.save(task)
  }

  private processItem(taskItemId: string, taskId: string): void {
    this.taskItemEventProducer.processItem({
      payload: {
        taskItemId,
        taskId
      }
    })
  }
}
