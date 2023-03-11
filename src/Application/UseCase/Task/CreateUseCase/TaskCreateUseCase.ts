import {
  Task,
  TaskItem,
  TaskItemStatusEnum,
  TaskService,
  TaskSettings,
  TaskStatusEnum
} from '../../../../Domain'
import { ITaskProducer } from '../../../Event'
import { ITaskCreatePayloadDto } from './ITaskCreatePayloadDto'

export class TaskCreateUseCase {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskEventProducer: ITaskProducer
  ) {}

  public async execute(dto: ITaskCreatePayloadDto): Promise<void> {
    const taskItems = dto.items.map(
      item => new TaskItem(item.row, TaskItemStatusEnum.PENDING, item.rawData)
    )

    const task = new Task(
      TaskStatusEnum.PENDING,
      new TaskSettings(dto.message, dto.processItemInterval)
    ).setTaskItems(taskItems)

    await this.taskService.save(task)

    this.taskEventProducer.taskCreated({
      payload: { taskId: task.getId() }
    })
  }
}
