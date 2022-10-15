import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  enabled: Boolean
}, {
  timestamps: false,
  versionKey: false
});

export default model('Module', schema);
