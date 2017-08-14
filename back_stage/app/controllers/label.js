var Article = require('../modals/article.js');
var Label = require('../modals/label.js');
// var _ = require('underscore');

/** insert label **/
exports.new = function(req, res) {
    res.render('insert_label.ejs', {
        title: 'insert label',
        article: {
            name: '',
            movies: []
        }
    });
}

//admin post label
exports.commit = function(req, res) {
    var label = req.body;

    var _label = new Label(label);

    _label.save(function(err, label) {
        if (err) {
            console.log(err);
        }

        res.redirect('/label/new');
    });
}

exports.getAll = function(req, res) {
    Label.fetch(function(err, labels) {
        if (err) {
            console.log(err);
        } else {
            res.json({dataCode: 1, labels: labels});
        }
    });
}


