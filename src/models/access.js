import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  actions: [{
    ref: 'Action',
    type: Schema.Types.ObjectId
  }],
  enabled: Boolean
}, {
  timestamps: false,
  versionKey: false
});

export default model('Access', schema);
