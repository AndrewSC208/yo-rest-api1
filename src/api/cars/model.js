import mongoose, { Schema } from 'mongoose'

const carsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  make: {
    type: String
  },
  model: {
    type: String
  },
  color: {
    type: String
  },
  year: {
    type: String
  }
}, {
  timestamps: true
})

carsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      make: this.make,
      model: this.model,
      color: this.color,
      year: this.year,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Cars', carsSchema)

export const schema = model.schema
export default model
