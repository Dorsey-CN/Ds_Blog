var Article = require('../modals/article.js');
var moment = require('moment');

exports.getArticle = function(req, res) {
    const COUNT = 10;
    let page = parseInt(req.query.p) * COUNT || 0;
    console.log(page);

    Article.fetch((err, articles) => {
        if (err) {
            console.log(err);
        } else {
                let totalPage = Math.ceil(articles.length / COUNT);
                let results = articles.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ dataCode: 1, articles: results, totalPage: totalPage, currentPage: currentPage });
        }
    });
}

exports.deleteArticle = function(req, res) {
    let id = req.query.id;
    if (id) {
        Article.remove({ _id: id }, (err, articles) => {
            if (err) {
                console.log(err);
            } else {
                Article.fetch((err, articles) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ msg: 1, articles: articles });
                    }
                });
            }
        });
    }
}
