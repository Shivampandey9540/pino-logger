// models/Log.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  level: String,
  msg: String,
  time: Date,
  pid: Number,
  hostname: String,
  v: Number
});

const Log = mongoose.model('Log', logSchema);

export default Log;
