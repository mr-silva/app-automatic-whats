import { IRepository } from '../../../../framework'
import { Task, TaskItem } from '../../../Domain'

export interface ITaskRepository extends IRepository<Task> {}
