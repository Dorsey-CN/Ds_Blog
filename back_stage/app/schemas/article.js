var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
    title: String,
    author: String,
    category: String,
    label: {
        type: ObjectId,
        ref: 'label'
    },
    img: String,
    summary: String,
    content: String,
    random: {
        type: Number,
        default: Math.random()
    },
    pv: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

ArticleSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

ArticleSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb);
    },
    findNext: function(id, cb) {
        return this
            .find({ '_id': {"$gt": id}})
            .limit(1)
            .sort({'_id': 1})
            .exec(cb);
    },
    findPre: function(id, cb) {
         return this
            .find({ '_id': {"$lt": id}})
            .limit(1)
            .sort({'_id': -1})
            .exec(cb);
    }
}

module.exports = ArticleSchema;
