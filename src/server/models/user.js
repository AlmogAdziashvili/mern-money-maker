const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String },
  watchList: { type: Array, default: [] },
  googleAccount: { type: Boolean },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

module.exports = model('User', UserSchema);
