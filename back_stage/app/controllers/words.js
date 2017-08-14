var Words = require('../modals/words.js');

/** words comment **/
exports.commit = function(req, res) {
    let _words = req.body;

    let words = new Words({
        from: _words.from,
        content: _words.content,
        platform: _words.platform
    });

    words.save(function(err, words) {
        if (err) {
            console.log(err);
        } else {
            res.json({ dataCode: 1, msg: '发表成功！' });
        }
    });
}

/** get all words **/
exports.getAllWords = function(req, res) {
    Words
        .find({})
        .populate('from', 'head name')
        .exec(function(err, words) {
            console.log(words);
            if (err) {
                console.log(err);
            } else {
                res.json({ msg: 1, words: words });
            }
        });
}

/** delete words **/
exports.deleteWords = function(req, res) {
    let id = req.query.id;
    if (id) {
        Words.remove({ _id: id }, (err, words) => {
            if (err) {
                console.log(err);
            } else {
                Words.fetch((err, words) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ msg: 1, words: words });
                    }
                });
            }
        });
    }
}

exports.wordsList = function(req, res) {
    const COUNT = 10;
    let page = parseInt(req.query.p) * COUNT || 0;

    Words
        .find({})
        .populate('from', 'head name')
        .exec(function(err, words) {
            if (err) {
                console.log(err);
            } else {
                let totalPage = Math.ceil(words.length / COUNT);
                let results = words.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ dataCode: 1, words: results, totalPage: totalPage, currentPage: currentPage });
            }
        });
}
