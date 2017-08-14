var mongoose = require('mongoose');
var LabelSchema = require('../schemas/label.js');
var Label = mongoose.model('label', LabelSchema);

module.exports = Label;