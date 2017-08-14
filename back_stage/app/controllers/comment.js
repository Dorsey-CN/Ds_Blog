var Comment = require('../modals/comment.js');

/** commit comment **/
exports.commit = function(req, res) {
    let _comment = req.body;

    let comment = new Comment({
        article: _comment.article,
        from: _comment.from,
        content: _comment.content
    });

    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        res.json({ dataCode: 1, msg: '发表成功！' });
    });
}

/** get comment list **/
exports.getAllComment = function(req, res) {
    let id = req.query.id;
    if (id) {
        Comment
            .find({ article: id })
            .populate('from', 'head name')
            .exec(function(err, comments) {
                console.log(comments);
                if (err) {
                    console.log(err);
                } else {
                    res.json({ msg: 1, comments: comments });
                }
            });
    }
}

/** get comment list **/
exports.getCommentList = function(req, res) {
    const COUNT = 10;
    let page = parseInt(req.query.p) * COUNT || 0;
    console.log(page);

    Comment
        .find({})
        .populate('from', 'head name')
        .populate('article', 'title')
        .exec(function(err, comments) {
            if (err) {
                console.log(err);
            } else {
                let totalPage = Math.ceil(comments.length / COUNT);
                let results = comments.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ dataCode: 1, comments: results, totalPage: totalPage, currentPage: currentPage });
            }
        });
}

/** delete comment **/
exports.deleteComment = function(req, res) {
    let id = req.query.id;
    if (id) {
        Comment.remove({ _id: id }, (err, comment) => {
            if (err) {
                console.log(err);
            } else {
                Comment
                    .find({})
                    .populate('from', 'head name')
                    .populate('article', 'title')
                    .exec(function(err, comments) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ msg: 1, comments: comments });
                        }
                    });
            }
        });
    }
}
