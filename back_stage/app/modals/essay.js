var mongoose = require('mongoose');
var EssaySchema = require('../schemas/essay.js');
var Essay = mongoose.model('essay', EssaySchema);

module.exports = Essay;