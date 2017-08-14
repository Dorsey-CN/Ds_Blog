var Article = require('../modals/article.js');
var Label = require('../modals/label.js');
var moment = require('moment');
var _ = require('underscore');
var path = require('path');
var fs = require('fs');

/** insert article **/
exports.new = function(req, res) {
    res.render('insert_article.ejs', {
        title: 'insert label',
        article: {
            name: '',
            movies: []
        }
    });
}

//admin post article
exports.commit = function(req, res) {
    let labelId = req.body.label;
    let article = req.body;
    
    for (item in req.query) {
        article[item] = req.query[item];
    }
    console.log(article);

    let _article = new Article(article);

    _article.save(function(err, article) {
        if (err) {
            console.log(err);
        }
        Label.findById(labelId, function(err, label) {
            label.articles.push(article._id);
            label.save(function(err, label) {
                if (err)
                    console.log(err);
                else
                    res.redirect('/front_stage/#/admin/article');
            });
        });
    });
}

//admin post article
exports.update = function(req, res) {
    let articleObject = req.body;
    // console.log(articleObject);
    for (item in req.query) {
        articleObject[item] = req.query[item];
    }

    let id = articleObject.id;
    let _article;
    if (id) {
        Article.findById(id, (err, article) => {
            if (err) {
                console.log(err);
            }
            _article = _.extend(article, articleObject);
            _article.save(function(err, article) {
                if (err) {
                    console.log(err);
                }
                let unchangedLabelId = _article.unchangedLabelId;
                if (unchangedLabelId) {
                    Label.findById(unchangedLabelId, function(err, label) {
                        if (err)
                            console.log(err);
                        label.articles.forEach(function(articleId, index) {
                            if (articleId.toString() === id.toString()) {
                                label.articles.splice(index, 1);
                                label.save(function(err, category) {
                                    // do nothing
                                });
                                return;
                            }
                        });

                    });
                }
                let labelId = _article.label;
                Label.findById(labelId, function(err, label) {
                    if (err)
                        console.log(err);
                    label.articles.push(article._id);

                    label.save(function(err, category) {
                        res.redirect('/front_stage/#/admin/article');
                    });
                });
            });
        });
    }
}

exports.getRandom = function(req, res) {
    Article.fetch((err, articles) => {
        if (err) {
            console.log(err);
        }
        var articleCount = articles.length;
        var s = Article.find().limit(-1).skip(Math.floor(Math.random() * articleCount)).next();
        // res.json({'articles': articles, errorno: 0});
    });
}

exports.getOne = function(req, res) {
    let id = req.query.id;

    if (id) {
        Article
            .find({ _id: id })
            .populate('label', 'name')
            .exec(function(err, article) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(article);
                    res.json({ msg: 1, article: article });
                }
            });
        // Article.findById(id, (err, article) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         // console.log(article);
        //         res.json({ msg: 1, article: article });
        //     }
        // });
    }
}

exports.get = function(req, res) {
    const COUNT = 5;
    let page = parseInt(req.query.p) * COUNT || 0;
    let length = req.path.split('/').length;
    let requestCategory = req.path.split('/')[length - 1];
    let articleCategory = '';
    switch (requestCategory) {
        case 'front':
            articleCategory = '前端开发';
            break;
        case 'nodejs':
            articleCategory = 'Node.js';
            break;
        case 'entertainment':
            articleCategory = '娱乐天地';
            break;
        default:
            ;
    }
    if (articleCategory !== '') {
        Article
            .find({ category: articleCategory })
            .populate('label', 'name')
            .exec(function(err, articles) {
                if (err) {
                    console.log(err);
                }
                let totalPage = Math.ceil(articles.length / COUNT);
                let results = articles.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ 'articles': results, errorno: 0, totalPage: totalPage, currentPage: currentPage });
            });
    } else {
        Article
            .find({})
            .populate('label', 'name')
            .exec(function(err, articles) {
                if (err) {
                    console.log(err);
                }
                let totalPage = Math.ceil(articles.length / COUNT);
                let results = articles.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ 'articles': results, errorno: 0, totalPage: totalPage, currentPage: currentPage });
            });
    }
}

exports.getPre = function(req, res) {
    let id = req.query.id;
    let preArticle = [];

    if (id) {
        Article.findPre(id, (err, article) => {
            if (err) {
                console.log(err)
            } else {
                preArticle = article;
                res.json({ msg: 1, pre: preArticle });
            }
        });
    }
}

exports.getNext = function(req, res) {
    let id = req.query.id;
    let nextArticle = [];

    if (id) {
        Article.findNext(id, (err, article) => {
            if (err) {
                console.log(err);
            } else {
                nextArticle = article;
                res.json({ msg: 1, next: nextArticle });
            }
        });
    }
}

/** to search result page  **/
exports.toSearch = function(req, res) {
    let keywords = req.body.keywords;
    if(keywords) {
        res.redirect('http://localhost:8000/front_stage/#/search/?q=' + keywords);
    } 
}

exports.searchResult = function(req, res) {
    // var categoryId = req.query.cat;
    const COUNT = 5;
    let page = parseInt(req.query.p) * COUNT || 0;

    let searchKeywords = req.query.keywords;
    console.log(searchKeywords);
    Article
        .find({ title: new RegExp('.*' + searchKeywords + '.*', 'i') })
        .populate('label', 'name')
        .exec(function(err, articles) {
            if (err)
                console.log(err);
            else {
                let totalPage = Math.ceil(articles.length / COUNT);
                let results = articles.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ dataCode: 1, articles: results, totalPage: totalPage, currentPage: currentPage, keywords: searchKeywords });
            }
        });
}

exports.getByLabel = function(req, res) {
    const COUNT = 2;
    let page = parseInt(req.query.p) * COUNT || 0;
    let label = req.query.label;
    console.log(label);

    Label
        .find({ _id: label })
        .populate({
            path: 'articles'
        })
        .exec(function(err, label) {
            let articles = label[0].articles;
            console.log(articles);
            let totalPage = Math.ceil(articles.length / COUNT);
            let results = articles.splice(page, COUNT);
            let currentPage = Math.ceil(page / COUNT) + 1;
            if (err)
                console.log(err);
            else {
                res.json({ dataCode: 1, articles: results, totalPage: totalPage, currentPage: currentPage, label: label });
            }
        });
}

//upload image
exports.uploadImage = function(req, res, next) {
    var upload = req.files.static;
    console.log(upload);
    var filePath = upload.path;
    var originName = upload.originalFilename;

    if (originName) {
        var timestamp = Date.now();
        var type = upload.type.split('/')[1];
        var articleImg = timestamp + '.' + type;
        var newPath = path.join(__dirname, '../../../', '/front_stage/static/article_picture/' + articleImg);
        fs.rename(filePath, newPath, function(err) {
            if (err){
                console.log(err);
                res.json({ errno: 1, msg: '图片长传发生错误'} );
            } else {
                console.log(111);
                let imagePath = '/static/article_picture/' + articleImg;
                res.json({ errno: 0, data: [imagePath] });
            }
            next();
        });
    } else {
        next();
    }
}
