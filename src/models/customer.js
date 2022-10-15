import { Schema, model } from 'mongoose';

const schema = new Schema({
  correlation: String,
  name: String,
  addresses: { 
    kind: String,
    street: String,
    number: String,
    state: String,
    country: String
  },
  users: [{
    ref: 'User',
    type: Schema.Types.ObjectId
  }],
  status: {
    ref: 'Status',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: false,
  versionKey: false
});

export default model('Customer', schema);
