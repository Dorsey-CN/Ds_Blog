<template>
    <div class="top-bar nav-bar navbar-fixed-top">
        <div class="container">
            <div class="blog-logo navbar-header">dorsey</div>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <router-link to="/article/home">首页</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/article/front">前端开发</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/article/nodejs">Node.js</router-link>
                </li>
                 <li class="nav-item">
                    <router-link to="/article/entertainment">娱乐天地</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/essay">随言碎语</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/words">留下脚印</router-link>
                </li>
                <li class="nav-item">
                    <!-- <router-link to="/about">关于</router-link> -->
                    <!-- <a class="about-author" href="">关于</a> -->
                </li>
            </ul>
            <div v-show="!user.isLogin" class="login-area nav navbar-nav navbar-right">
                <a class="sign-in" href="http://localhost:8000/src/pages/sign_in.html">登录</a>
                <a class="sign-up" href="http://localhost:8000/src/pages/sign_up.html">注册</a>
            </div>
            <div v-show="user.isLogin" class="user-area pull-right">
                <span>欢迎，{{user.name}}</span>
                <a href="/user/logout" class="logout">退出</a>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    const ERROR_OK = 0;
    const SUCCESS_CODE = 1;
    export default {
        data() {
            return {
                user: {
                    isLogin: false,
                    name: ''
                }
            }
        },
        created() {
            this.isLogin();
        },
        methods: {
            isLogin() {
                this.$http.get('/user/isLogin/').then((response) => {
                    response = response.body;
                    if(response.errorno === ERROR_OK) {
                        this.user.isLogin = response.loginStatus;
                        this.user.name = response.username;
                    }
                }, (response) => {
                    console.log('error');
                });
            },
            // isExist() {
            //     this.$http.get('/user/isExist/').then((response) => {
            //         response = response.body;
            //         if(response.dataCode !== ERROR_OK) {
            //             this.user.isLogin = response.loginStatus;
            //             this.user.name = '';
            //         }
            //     }, (response) => {
            //         console.log('error');
            //     });
            // }
        }
    }
</script>
<style lang="scss" type="stylesheet/sass" scoped>
    @import '../../common/css/reset_bootstrap.scss';
    .top-bar {
        background-color: #333;
        .container {
            padding: 0;
            .blog-logo {
            }   
            .nav {
                .nav-item{
                    a{
                        padding: 0 15px;
                        height: 40px;
                        line-height: 40px;
                        color: #9d9d9d;
                        cursor: pointer;
                        text-decoration: none;
                        &:hover {
                            background-color: #008CBA;
                            color: #fff;
                        }
                    }
                    .active {
                        background-color: #008CBA;
                        color: #fff;
                    }
                }
            }
            .login-area {
                .sign-in,
                .sign-up {
                    display: inline-block;
                    padding: 0 15px;
                    line-height: 40px;
                    height: 40px;
                    color: #9d9d9d;
                    cursor: pointer;
                    &:hover {
                        background-color: #008CBA;
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
            .user-area {
                line-height: 40px;
                height: 40px;
                color: #fff;
                .logout {
                    margin-left: 10px;
                }
            }
        }
    }
</style>
