var Label = require('../app/controllers/label.js');
var Article = require('../app/controllers/article.js');
var User = require('../app/controllers/user.js');
var Manager = require('../app/controllers/manager.js');
var Comment = require('../app/controllers/comment.js');
var Essay = require('../app/controllers/essay.js');
var Words = require('../app/controllers/words.js');

module.exports = function(app) {
    /** pre handle user**/
    // app.use(function(req, res, next) {
    //     var _user = req.session.user;
    //     app.locals.user = _user;
    //     next();
    // });

    /** Index **/
    // app.get('/', Index.index);

    /** User **/
    app.post('/user/signup', User.saveHead, User.signup);
    app.post('/user/signin', User.signin);
    app.get('/user/isLogin', User.checkLogin);
    app.get('/user/logout', User.logout);
    app.get('/user/isExist', User.isExist);
    app.get('/user/list', User.getAllUsers);
    app.delete('/user/delete', User.deleteUser);

    /** Label **/
    app.get('/label/new', Label.new);
    app.post('/admin/label/commit', Label.commit);
    app.get('/label/getAll', Label.getAll);

    /** Article **/
    app.get('/article/new', Article.new);
    app.post('/admin/article/commit', Article.commit);
    app.post('/admin/article/update', Article.update);
    app.get('/article/get/:id', Article.get);
    app.get('/article/getone', Article.getOne);
    app.get('/article/getPre', Article.getPre);
    app.get('/article/getNext', Article.getNext);
    app.post('/article/search', Article.toSearch);
    app.get('/article/result', Article.searchResult);
    app.get('/article/label', Article.getByLabel);

    /** Manager **/
    app.get('/manager/article/list', Manager.getArticle);
    app.delete('/manager/article/delete', Manager.deleteArticle);

    /** Comment **/
    app.post('/comment/commit', Comment.commit);
    app.get('/comment/all', Comment.getAllComment);
    app.get('/comment/list', Comment.getCommentList);
    app.delete('/comment/delete', Comment.deleteComment);

    /** Essay **/
    app.get('/essay/list', Essay.easyList);
    app.post('/admin/essay/commit', Essay.commit);
    app.post('/essay/update', Essay.update);
    app.get('/essay/getAll', Essay.getAll);
    app.get('/essay/getone', Essay.getOne);
    app.delete('/essay/delete', Essay.deleteEssay);

    /** Words **/
    app.post('/words/commit', Words.commit);
    app.get('/words/list', Words.wordsList);
    app.get('/words/all', Words.getAllWords);
    app.delete('/words/delete', Words.deleteWords);

    /** upload image **/
    app.post('/upload', Article.uploadImage);
}
