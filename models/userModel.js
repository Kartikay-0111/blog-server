const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true // Not required here, but still unique
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

userSchema.statics.signup = async function (email, username, password) {
  // Validate fields for signup
  if (!email || !username || !password) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Not a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Please enter a strong password');
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw new Error('This Email is already signed up');
  }
  if (usernameExists) {
    throw new Error('Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });
  return user;
};

userSchema.statics.login = async function (username, password) {
  // Validate fields for login
  if (!username || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('This username is not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
