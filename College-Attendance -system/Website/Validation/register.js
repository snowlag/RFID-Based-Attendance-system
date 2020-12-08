const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.role = !isEmpty(data.role) ? data.role : '';

  
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.newUser = 'Username must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.newUser = 'Username field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.newUser = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.newUser = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.newUser = 'Password field is required';
  }
  if (Validator.isEmpty(data.role)) {
    errors.newUser = 'Role is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.newUser = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
