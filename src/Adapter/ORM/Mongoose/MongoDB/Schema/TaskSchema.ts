import { Schema } from 'mongoose'
import { TaskStatusEnum } from '../../../../../Domain'
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
    status: {
      type: Object.keys(TaskStatusEnum),
      required: true
    },
    settings: TaskSettingsSchema,
    items: [TaskItemSchema]
  },
  {
    collection: 'task',
    timestamps: true
  }
)
