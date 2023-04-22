import { Schema } from 'mongoose'
import { TaskStatusEnum, TaskTypeEnum } from '#domain'
import { TaskItemSchema } from './TaskItemSchema'

const TaskSettingsSchema = new Schema(
  {
    message: String,
    processItemInterval: Number
  },
  {
    _id: false
  }
)

export const TaskSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: true
    },
    status: {
      type: Object.keys(TaskStatusEnum),
      required: true
    },
    settings: TaskSettingsSchema,
    items: [TaskItemSchema],
    type: {
      type: Object.keys(TaskTypeEnum),
      required: true
    }
  },
  {
    collection: 'task',
    timestamps: true
  }
)
