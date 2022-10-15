import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  access: [{
    ref: 'Access',
    type: Schema.Types.ObjectId
  }],
  enabled: Boolean
}, {
  timestamps: false,
  versionKey: false
});

export default model('Role', schema);
