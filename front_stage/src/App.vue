<template>
    <div class="app-wrapper" v-show="status">
        <topbar></topbar>
        <div class="content-wrapper">
            <carousel v-show="isHomePage"></carousel>
            <div class="container">
                <content-path v-show="!isHomePage"></content-path>
                <div class="row">
                    <div class="col-md-8 row-left">
                        <notice v-show="isHomePage"></notice>
                        <router-view></router-view>
                    </div>
                    <div class="col-md-4 row-right">
                        <div class="search-connect">
                            <div class="search-area">
                                <form id="search-form" method="POST" action="/article/search">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="全站搜索" name="keywords" ref="search"/>
                                        <span class="input-group-btn">
                                            <button class="btn btn-default" type="button" @click="search">
                                                <i class="iconfont icon-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                            <div class="connect-area">
                                <div class="methods">
                                    <a href="https://github.com/Dorsey-CN" target="_blank" class="github">
                                        <i class="iconfont icon-github"></i>
                                    </a>
                                    <a href="#" target="_blank" class="wechat">
                                        <i class="iconfont icon-wechat"></i>
                                    </a>
                                    <a href="http://weibo.com/u/6244429569/home" target="_blank" class="weibo">
                                        <i class="iconfont icon-weibo"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="split"></div>
                        </div>
                        <labels></labels>
                        <!-- <div class="random-article">
                            <h3 class="title h4">
                                <i class="iconfont icon-random"></i>随机文章
                            </h3>
                            <div v-for="articleItem in randomArticle" class="article-item">
                                <div class="article-img">
                                    <a href="#">
                                        <img :src="articleItem.img" />
                                    </a>
                                </div>
                                <div class="article-content">
                                    <a href="#" v-text="articleItem.title" class="article-title"></a>
                                    <p v-text="articleItem.summary" class="article-text"></p>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import carousel from 'components/carousel/carousel.vue';
import currentPath from 'components/content_path/content_path.vue';
import topbar from 'components/topbar/topbar.vue';
import labels from 'components/labels/labels.vue';
import notice from 'components/notice/notice.vue';
import footer from 'components/footer/footer.vue';

export default {
    data() {
        return {
            randomArticle: [
                {
                    img: '/static/image/random_article.jpg',
                    title: 'PHP的CURL操作...',
                    summary: 'CURL 是一个利用URL语法规定来传输文件和数据的工具，支持很多工具...'
                },
                {
                    img: '/static/image/random_article.jpg',
                    title: 'PHP的CURL操作...',
                    summary: 'CURL 是一个利用URL语法规定来传输文件和数据的工具，支持很多工具...'
                },
                {
                    img: '/static/image/random_article.jpg',
                    title: 'PHP的CURL操作...',
                    summary: 'CURL 是一个利用URL语法规定来传输文件和数据的工具，支持很多工具...'
                }
            ],
            status: true,
            isHomePage: false
        }
    },
    created() {
        this.checkStatus();
    },
    watch: {
        '$route' (to, from) {
            this.checkStatus();
            if(this.checkStatus()) {
                window.location.reload();
            }
        }
    },
    methods: {
        checkStatus() {
            let currentHash = window.location.hash;
            if(currentHash.indexOf('admin') > -1) {
                this.status = false;
            }
            if(currentHash.indexOf('home') > -1) {
                this.isHomePage = true;
            }
            return this.isHomePage;
        },
        search() {
            this.$nextTick(() => {
                let keywords = this.$refs.search.value;
                if(keywords !== '') {
                    document.getElementById('search-form').submit();
                }
            });
        }
    },
    components: {
        'carousel': carousel,
        'content-path': currentPath,
        'topbar': topbar,
        'labels': labels,
        'notice': notice,
        'v-footer': footer
    }
}
</script>
<style lang="scss" type="stylesheet/sass" scoped>
    .app-wrapper {
        .content-wrapper {
            padding: 20px 0 40px;
            margin-top: 40px;
            background-color: #f1f2f0;
            .search-area {
                .btn {
                    padding: 5px 12px;
                    .icon-search {
                        font-size: 16px;
                    }
                }
            }
            .connect-area {
                margin-top: 20px;
                .methods {
                    width: 80%;
                    margin: 0 auto;
                    a {
                        display: inline-block;
                        margin-left: 10%;
                        &:focus {
                            text-decoration: none;
                            color: #7fecad;
                        }
                        .iconfont{
                            font-size: 35px;
                            &:hover,
                            &:focus {
                                color: #7fecad;
                            }
                        }
                    }
                }
            }
            .split {
                padding: 5px;
                margin: 0 auto 20px;
                width: 90%;
                border-bottom: 1px dashed #4cae4c;
            }
            .random-article {
                margin-top: 20px;
                color: #756F71;
                .title {
                    color: #756F71;
                    .icon-random {
                        margin-right: 10px;
                    }
                }
                .article-item {
                    display: flex;
                    margin-bottom: 20px;
                    .article-img {
                        flex: 0 0 120px;
                        margin-right: 20px;
                        height: 80px;
                        width: 12220px;
                        opacity: 1;
                        transform: scale(1);
                        transition: opacity .35s, transform .35s;
                        &:hover {
                            opacity: 0.8;
                            transform: scale(1.1);
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .article-content {
                        flex: 1;
                        .article-title {
                            font-size: 16px;
                        }
                        .article-text {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>
