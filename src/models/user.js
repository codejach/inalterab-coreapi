import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new Schema({
  info: {
    firstname: String,
    middlename: String,
    lastname: String,
    surname: String,
    birthday: Date,
    gender: {
      type: String,
      enum: ['', 'm', 'f'],
      default: ''
    },
    addresses: [{ 
      kind: String,
      street: String,
      internal_number: String,
      external_number: String,
      references: String,
      locality: String,
      municipality: String,
      state: String,
      country: String
    }]
  },
  login: {
    account: {
      type: String,
      unique: true
    },
    password: String, 
    kind: {
      type: String,
      enum: ['internal', 'facebook', 'google', 'ethereum'],
      default: 'internal'
    },
    uuid: String,
    verified: {
      type: Boolean,
      required: true,
      default: 'false'
    }
  },
  nickname: String,
  correlation: {
    type: String,
    required: true
  },
  roles: [{ 
    ref: 'Role', 
    type: Schema.Types.ObjectId,
    required: true
  }],
  status: { 
    ref: 'Status', 
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: false,
  versionKey: false
});

schema.statics.encrypt = async (text) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(text, salt);
}

schema.statics.compare = async (text, _text) => {
  return await bcrypt.compare(text, _text);
}

export default model('User', schema);
