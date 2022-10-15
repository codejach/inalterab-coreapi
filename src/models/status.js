import { Schema, model } from 'mongoose';

const schema = new Schema({
  kind: String,
  name: String,
  description: String
}, {
  timestamps: false,
  versionKey: false
});

export default model('Status', schema);
