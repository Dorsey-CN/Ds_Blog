var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var User = mongoose.model('user', UserSchema);

module.exports = User;