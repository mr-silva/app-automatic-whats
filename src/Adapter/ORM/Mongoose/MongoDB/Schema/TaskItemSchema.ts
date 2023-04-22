import { Schema } from 'mongoose'
import { TaskItemStatusEnum } from '#domain'

export const TaskItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    row: {
      type: Number,
      required: true
    },
    status: {
      type: Object.keys(TaskItemStatusEnum),
      required: true
    },
    rawData: Object,
    note: String
  },
  {
    _id: false
  }
)
