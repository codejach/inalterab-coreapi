import mongoose from 'mongoose';

mongoose
  .connect('mongodb://user-dev:password-dev@mongo:27017/core-dev')
  .then(_ => console.log('Db is connected'))
  .catch(error => console.log(error));
