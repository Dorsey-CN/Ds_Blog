var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article.js');
var Article = mongoose.model('article', ArticleSchema);

module.exports = Article;