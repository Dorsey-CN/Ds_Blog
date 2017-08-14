var path = require('path');
var fs = require('fs');
var urllib = require('url');
var User = require('../modals/user.js');

/** user signup**/
exports.signup = function(req, res, next) {
    let _user = req.body;
    _user.role = 0;
    if (req.head) {
        _user.head = req.head;
    }
    var user = new User(_user);

    user.save(function(err, user) {
        if (err) {
            console.log(err);
        }
        res.redirect('http://localhost:8000/src/pages/sign_in.html');
    });
}

/** user signin **/
exports.signin = function(req, res) {
    console.log(req.query);
    var _user = req.query;
    var _username = _user.name;
    var _password = _user.password;

    User.findOne({ name: _username }, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (!user) {
            // return res.redirect('http://localhost:8000/src/pages/sign_up.html');
            return res.json({ status: 0, msg: '用户名或者密码不正确' });
            console.log('current count is not exist');
        }

        user.comparePassword(_password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = { name: _username, _id: user._id };
                let url = 'http://localhost:8000/front_stage/#/';
                if(user.role === 1) {
                    url = 'http://localhost:8000/front_stage/#/admin/home';
                }
                return res.json({ status: 1, url: url });

            } else {
                return res.json({ status: 0, msg: '用户名或者密码不正确' });
                console.log('password is not matched');
            }
        });
    })
}

//user is exist
exports.isExist = function(req, res, next) {
    let _user = req.query;
    User.findOne({ name: _user.username }, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (user) {
            res.json({ dataCode: 0, msg: '用户名已存在' });
        } else {
            res.json({ dataCode: 1 });
        }
    });
}

//user save head
exports.saveHead = function(req, res, next) {
    var uploadHead = req.files.userHead;
    var filePath = uploadHead.path;
    var originName = uploadHead.originalFilename;

    if (originName) {
        var timestamp = Date.now();
        var type = uploadHead.type.split('/')[1];
        var head = timestamp + '.' + type;
        var newPath = path.join(__dirname, '../../../', '/front_stage/static/user_head/' + head);
        fs.rename(filePath, newPath, function(err) {
            if (err)
                console.log(err);
            req.head = head;
            next();
        });
    } else {
        next();
    }
}

/** check login **/
exports.checkLogin = function(req, res) {
    let loginStatus = false;
    if (req.session.user) {
        let username = req.session.user.name;
        let userId = req.session.user._id;
        let userHead = req.session.user.head;
        if (req.session.user) {
            loginStatus = true;
        }
        res.send({ 'loginStatus': loginStatus, errorno: 0, 'username': username, 'userId': userId });
    } else {
        res.send({ errorno: 1 });
    }
}

/** user logout **/
exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('http://localhost:8000/front_stage/#/article/home');
}


/** get user list **/
exports.getAllUsers = function(req, res) {
    const COUNT = 10;
    let page = parseInt(req.query.p) * COUNT || 0;

    User
        .fetch(function(err, users) {
            if (err) {
                console.log(err);
            } else {
                let totalPage = Math.ceil(users.length / COUNT);
                let results = users.splice(page, COUNT);
                let currentPage = Math.ceil(page / COUNT) + 1;
                res.json({ dataCode: 1, users: results, totalPage: totalPage, currentPage: currentPage });
            }
        })
}

/** delete words **/
exports.deleteUser = function(req, res) {
    let id = req.query.id;
    if (id) {
        User.remove({ _id: id }, (err, users) => {
            if (err) {
                console.log(err);
            } else {
                User.fetch((err, users) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({ msg: 1, users: users });
                    }
                });
            }
        });
    }
}
