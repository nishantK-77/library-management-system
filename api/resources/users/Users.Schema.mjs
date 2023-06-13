import { buildSchema, Schema } from '@am92/mongo-odm'

const UserSchemaObject = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: '2', required: true },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' }
}

const UserSchema = buildSchema(UserSchemaObject)
UserSchema.index({ email: 1, unique: true, dropDups: true })

export default UserSchema
