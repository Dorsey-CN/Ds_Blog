var mongoose = require('mongoose');
var WordsSchema = require('../schemas/words.js');
var Words = mongoose.model('words', WordsSchema);

module.exports = Words;