var Article = require('../modals/article.js');

/** search page **/
exports.search = function(req, res) {
    // var categoryId = req.query.cat;
    // console.log(categoryId);
    let page = parseInt(req.query.p) * 2 || 0;

    // if (categoryId) {
    //     Category
    //         .find({ _id: categoryId })
    //         .populate({
    //             path: 'movies'
    //                 // options: { limit: 2, skip: page}
    //         })
    //         .exec(function(err, categories) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             var category = categories[0] || {};
    //             var movies = category.movies || [];
    //             var totalPage = Math.ceil(movies.length / 2);
    //             var results = movies.splice(page, 2);
    //             var keywords = category.name;
    //             res.render('pages/results', {
    //                 title: 'movie 搜索结果页',
    //                 keywords: keywords,
    //                 totalPage: totalPage,
    //                 currentPage: Math.ceil(page / 2) + 1,
    //                 query: 'cat=' + categoryId,
    //                 movies: results
    //             });
    //         });
    // } else {
    let searchKeywords = req.body.q;
    Article.find({ title: new RegExp(searchKeywords + '.*', 'i') }, function(err, articles) {
        if (err)
            console.log(err);
        let totalPage = Math.ceil(articles.length / 2);
        let results = articles.splice(page, 2);
        let currentPage = Math.ceil(page / 2) + 1;

        
    });
    // }
}
