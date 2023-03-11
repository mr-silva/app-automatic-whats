import { Task } from '../../Entity'
import { ITaskRepository } from '../../Repository'

export class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async getOneById(id: string): Promise<Task> {
    return this.taskRepository.getOneById(id)
  }

  public async save(task: Task): Promise<Task> {
    return this.taskRepository.save(task)
  }
}
