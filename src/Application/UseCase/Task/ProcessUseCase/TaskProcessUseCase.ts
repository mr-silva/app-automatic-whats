import { TaskService, TaskStatusEnum } from '#domain'
import { ITaskItemProducer } from '../../../Event'
import { ITaskProcessPayloadDto } from './ITaskProcessPayloadDto'

export class TaskProcessUseCase {
  private readonly mininumTaskProcessSecond = Number(process.env.APP_TASK_PROCESS_MINIMUN_SECOND)

  constructor(
    private readonly taskService: TaskService,
    private readonly taskItemEventProducer: ITaskItemProducer
  ) {}

  public async execute(dto: ITaskProcessPayloadDto): Promise<void> {
    const task = await this.taskService.getOneById(dto.taskId)

    task.setStatus(TaskStatusEnum.PROCESSING)

    await this.taskService.save(task)

    let previousInterval: number = 0
    task.getItems().forEach(item => {
      const randonTime = this.randomInterval(task.getSettings().getProcessItemInterval())

      const interval = (randonTime + previousInterval) * 1000

      previousInterval = interval / 1000

      setTimeout(() => this.processItem(item.getId(), task.getId(), dto.accountId), interval)
    })

    task.setStatus(TaskStatusEnum.FINISHED)

    await this.taskService.save(task)
  }

  private processItem(taskItemId: string, taskId: string, accountId: string): void {
    this.taskItemEventProducer.processItem({
      payload: {
        taskItemId,
        taskId,
        accountId
      }
    })
  }

  private randomInterval(max: number): number {
    return Math.floor(
      Math.random() * (max - this.mininumTaskProcessSecond + 1) + this.mininumTaskProcessSecond
    )
  }
}
