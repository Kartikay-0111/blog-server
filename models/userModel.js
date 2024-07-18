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
    throw new Error('Sab fill karna padta hai');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email toh sahi daal');
  }
  const passwordCriteria = {
    minLength: 8,
    minLowercase: 2,
    minNumbers: 1,
    minSymbols: 1,
  };

  // Check each criterion separately
  if (password.length < passwordCriteria.minLength) {
    throw new Error(`Password must be at least ${passwordCriteria.minLength} characters long`);
  }
  if ((password.match(/[a-z]/g) || []).length < passwordCriteria.minLowercase) {
    throw new Error(`Password must contain at least ${passwordCriteria.minLowercase} lowercase letters`);
  }
  if ((password.match(/[0-9]/g) || []).length < passwordCriteria.minNumbers) {
    throw new Error(`Password must contain at least ${passwordCriteria.minNumbers} numbers`);
  }
  if ((password.match(/[\W_]/g) || []).length < passwordCriteria.minSymbols) {
    throw new Error(`Password must contain at least ${passwordCriteria.minSymbols} special characters`);
  }
  // if (!validator.isStrongPassword(password,{ minLength: 8, minLowercase: 2, minNumbers: 1, minSymbols: 1 })) {
  //   throw new Error('Password dhaang ka bana😎');
  // }
  
  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw new Error('Ye email already hai😉');
  }
  if (usernameExists) {
    throw new Error('Koi unique username soch😀');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });
  return user;
};

userSchema.statics.login = async function (username, password) {
  // Validate fields for login
  if (!username || !password) {
    throw new Error('Sab fill karna padta hai🤬');
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('Bhul gaya kya username😂');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Bhul gaya na password,kamine🤬');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
