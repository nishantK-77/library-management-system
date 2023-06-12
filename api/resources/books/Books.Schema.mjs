import { buildSchema, Schema } from '@am92/mongo-odm'

const BookSchemaObject = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  assignedTo: { type: String, required: true },

  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' }
}

const BookSchema = buildSchema(BookSchemaObject)
BookSchema.index({ genre: 1 })
BookSchema.index({ assignedTo: 1 })

export default BookSchema
