var Article = require('../modals/article.js');
var Essay = require('../modals/essay.js');
var _ = require('underscore');

//admin post esssay
exports.commit = function(req, res) {
    var essay = req.query;
    console.log(essay);

    var _essay = new Essay(essay);

    _essay.save(function(err, essay) {
        if (err) {
            console.log(err);
        }

        res.redirect('/front_stage/#/admin/essay');
    });
}

/** admin update esssay **/
exports.update = function(req, res) {
    console.log('ok');
    let essayObject = req.body;
    essayObject.content = req.query.content;
    let id = essayObject.id;
    let _essay;

    if (id) {
        Essay.findById(id, (err, esssay) => {
            if (err) {
                console.log(err);
            }

            _essay = _.extend(esssay, essayObject);
            _essay.save(function(err, essay) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/front_stage/#/admin/essay');
                }
            });
        });
    }
}

/** get all essays **/
exports.getAll = function(req, res) {
    Essay.fetch(function(err, essays) {
        if (err) {
            console.log(err);
        } else {
            res.json({ dataCode: 1, essays: essays });
        }
    });
}

/** get one essay **/
exports.getOne = function(req, res) {
    let id = req.query.id;

    if (id) {
        Essay.findById(id, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ msg: 1, essay: essay });
            }
        });
    }
}

/** get easy list **/
exports.easyList = function(req, res) {
    const COUNT = 10;
    let page = parseInt(req.query.p) * COUNT || 0;
    console.log(page);

    Essay.fetch(function(err, essays) {
        if (err) {
            console.log(err);
        } else {
            let totalPage = Math.ceil(essays.length / COUNT);
            let results = essays.splice(page, COUNT);
            let currentPage = Math.ceil(page / COUNT) + 1;
            res.json({ dataCode: 1, essays: results, totalPage: totalPage, currentPage: currentPage });
        }
    });
}

/** delete words **/
exports.deleteEssay = function(req, res) {
    let id = req.query.id;
    if (id) {
        Essay.remove({ _id: id }, (err, essay) => {
            if (err) {
                console.log(err);
            } else {
                Essay.fetch((err, essays) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ msg: 1, essays: essays });
                    }
                });
            }
        });
    }
}
