import { Schema, model } from 'mongoose';

const schema = new Schema({
  name:  {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  url: String,
  method: {
    type: String,
    enum: ['DELETE', 'GET', 'POST', 'PUT'],
    default: 'GET'
  },
  module: {
    ref: 'Module',
    type: Schema.Types.ObjectId
  },
  enabled: Boolean
}, {
  timestamps: false,
  versionKey: false
});

export default model('Action', schema);
