import { Schema } from 'mongoose'

const ConfigsSchema = new Schema(
  {
    zApiInstance: String,
    zApiToken: String
  },
  {
    _id: false
  }
)

export const AccountSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    configs: ConfigsSchema
  },
  {
    timestamps: true,
    collection: 'account'
  }
)
