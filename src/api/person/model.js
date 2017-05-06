import mongoose, { Schema } from 'mongoose'

const personSchema = new Schema({
  name: {
    type: String
  },
  height: {
    type: String
  },
  age: {
    type: String
  }
}, {
  timestamps: true
})

personSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      height: this.height,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Person', personSchema)

export const schema = model.schema
export default model
