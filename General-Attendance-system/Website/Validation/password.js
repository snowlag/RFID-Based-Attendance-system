const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePassword(data) {
  let errors = {};
  data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword : '';
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword  : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  if (Validator.isEmpty(data.oldpassword)) {
    errors.changepassword = 'Old Password  is required';
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.changepassword = 'Please provide the new Password';
  }
  if (Validator.isEmpty(data.username)) {
    errors.changepassword= 'Please provide the username';
  }

  if (!Validator.isLength(data.newpassword, { min: 6, max: 30 })) {
    errors.changepassword = 'Password must be at least 6 characters';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};