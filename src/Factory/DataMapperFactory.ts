import {
  AccountDataMapper,
  TaskDataMapper,
  TaskDataMapperMediator,
  TaskItemDataMapper
} from '../Adapter/ORM'

export class DataMapperFactory {
  private buildTaskDataMapper() {
    return new TaskDataMapper()
  }

  private buildTaskItemDataMapper() {
    return new TaskItemDataMapper()
  }

  public buildTaskDataMapperMediator() {
    return new TaskDataMapperMediator(this.buildTaskDataMapper(), this.buildTaskItemDataMapper())
  }

  public buildAccountDataMapper() {
    return new AccountDataMapper()
  }
}
