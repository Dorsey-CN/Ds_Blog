<template>
    <div class="manager" v-show="status">
        <header class="top-area container-fluid">
            <div class="pull-right">
                <a class="user-name btn btn-danger" role="button" href="#">
                    <i class="iconfont icon-user"></i>dorsey
                </a>
                <a class="log-out btn btn-success" role="button" href="http://localhost:8000/src/pages/sign_in.html">
                    <i class="iconfont icon-2"></i>退出
                </a>
            </div>
        </header>
        <div class="content-wrapper">
            <div class="row">
                <div class="nav-list col-md-2">
                    <h4 class="title h4">DS_Blog Admin</h4>
                    <ul class="list-group">
                        <!-- <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <a href="http://localhost:8000/front_stage/#/">网站首页</a>
                        </li> -->
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/home">系统首页</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/release/article">文章发布</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/release/essay">随笔发布</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/article">文章管理</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/words">留言管理</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/comment">评论管理</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/essay">随笔管理</router-link>
                        </li>
                        <li class="list-group-item">
                            <i class="iconfont icon-user"></i>
                            <router-link to="/admin/user">用户管理</router-link>
                        </li>
                    </ul>
                </div>
                <div class="show-content col-md-10">
                    <h2 class="title h3">后台系统</h2>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                status: false
            }
        },
        created() {
            this.checkStatus();
        },
        watch: {
            '$route' (to, from) {
                this.checkStatus();
            }
        },
        methods: {
            checkStatus() {
                let currentHash = window.location.hash;
                if (currentHash.indexOf('admin') > -1) {
                    this.status = true;
                }
            }
        }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
.manager {
    .top-area {
        line-height: 35px;
        height: 35px;
        background-color: #363636;
        .btn {
            padding: 5px 10px;
            background: -webkit-linear-gradient(bottom, #303030, #626262);
            background: -o-linear-gradient(bottom, #303030, #626262);
            background: -moz-linear-gradient(bottom, #303030, #626262);
            background: linear-gradient(bottom, #303030, #626262);
            border: none;
            font-size: 12px;
            color: #979797;
            &:hover {
                opacity: 0.8;
                color: #fff;
            }
            .iconfont {
                position: relative;
                top: 1px;
                font-size: 14px;
            }
        }
    }
    .content-wrapper {
        // margin-bottom: 20px;
        .row {
            background-color: #444444;
            .nav-list {
                padding: 0;
                height: 100%;
                background-color: #444444;
                .title {
                    margin: 0;
                    padding: 0 0 20px 40px;
                    width: 100%;
                    background-color: #363636;
                    text-align: center;
                    color: #fff;
                }
                .list-group {
                    .list-group-item {
                        padding-left: 50px;
                        width: 100%;
                        border-radius: 0;
                        border-top: 1px solid #4c4c4c;
                        border-bottom: 1px solid #3A3A3A;
                        background-color: #444444;
                        color: #A2A2A2;
                        a {
                            color: #A2A2A2;
                            &:hover {
                                color: #5CB85C;
                            }
                        }
                        .iconfont {
                            position: relative;
                            margin-right: 10px;
                            top: 2px;
                            font-size: 18px;
                        }
                        .active {
                            color: #5CB85C;
                        }
                    }
                }
            }
            .show-content {
                padding: 0;
                border: 1px solid #EEEEEE;
                border-radius: 4px 0 0 0;
                background-color: #EEEEEE !important;
                .title {
                    padding: 20px 0 20px 20px;
                    margin: 0;
                    background-color: #F8F8F8;
                    color: #474747;
                }
            }
        }
    }
}
</style>
