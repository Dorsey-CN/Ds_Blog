<template>
    <div class="content-list">
       <div v-for="item in article" class="list-item container">
            <div class="row">
                <h3 class="title col-md-12 col-lg-12 h3">
                    <!-- <a href="#" v-text="item.title"></a> -->
                    <router-link v-text="item.title" :to="'/specific_content/' + item._id">阅读全文</router-link>
                </h3>
                <div class="tags col-md-12 col-lg-12">
                    <span class="user tag-item">
                        <i class="iconfont icon-user"></i>
                        <i v-text="item.author" class="tag-text"></i>
                    </span>
                    <span class="calendar tag-item">
                        <i class="iconfont icon-calendar"></i>
                        <i v-text="item.updatetime" class="tag-text"></i>
                    </span>
                    <span class="category tag-item">
                        <i class="iconfont icon-category"></i>
                        <i v-text="item.category" class="tag-text"></i>
                    </span>
                    <span class="labels tag-item">
                        <i class="iconfont icon-tag"></i>
                        <a :href="'http://localhost:8000/front_stage/#/label/search/?label=' + item.label._id + '&labelname=' + item.label.name">
                            <i v-text="item.label.name" class="tag-text"></i>
                        </a>
                    </span>
                </div>
                <div class="item-img col-md-6 col-lg-4">
                     <router-link :to="'/specific_content/' + item._id">
                        <img :src="item.img" width="220" height="150" />
                    </router-link>
                </div>
                <div class="item-text col-md-6 col-lg-8">
                    <p v-text="item.summary"></p>
                    <router-link :to="'/specific_content/' + item._id" class="btn btn-success" role="button">阅读全文</router-link>
                </div>
            </div>
       </div>
       <div class="pagination-wrapper">
           <ul class="pagination">
                <li :class="{disabled: currentPage === 1}">
                    <a href="javascript:;" @click.prevent="changePage($event, currentPage-2)" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li v-for="count in totalPage" :class="{active: count === currentPage}">
                    <span v-if="count === currentPage">{{count}}</span>
                    <a v-if="count !== currentPage" @click="changePage">{{count}}</a>
                </li>
                <li :class="{disabled: currentPage === totalPage}">
                    <a href="javascript:;" @click.prevent="changePage($event, currentPage)" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
           </ul>
       </div>
    </div>
</template>
<script>
    import moment from 'moment';
    const ERROR_OK = 0;
    export default {
        data() {
            return {
                article: [],
                currentPage: 0,
                totalPage: 0
            }
        },
        created() {
            this.getArticles();
        },
        watch: {
            '$route' (to, from) {
                this.getArticles();
            }
        },
        methods: {
            getArticles(pageCount) {
                var type = window.location.hash.split('/')[2];
                let url = '/article/get/' + type;
                if(pageCount) {
                    url += '?p=' + pageCount;
                }
                this.$http.get(url).then((response) => {
                response = response.body;
                response.articles.forEach(function(article) {
                    article.updatetime = moment(article.meta.updateAt).format('YYYY-MM-DD HH:MM:SS');
                });
                let currentHash = window.location.hash;
                if (response.errorno === ERROR_OK) {
                    this.article = response.articles;
                    this.totalPage = response.totalPage;
                    this.currentPage = response.currentPage;
                }
                }, (response) => {
                    console.log('error');
                });
            },
            changePage(event, page) {
                if(page < 0 || page >= this.totalPage) {
                    return ;
                }
                let pageCount = parseInt(event.target.innerHTML) - 1;
                if(page !== undefined) {
                    pageCount = page;
                }
                this.getArticles(pageCount);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
    .content-list {
        .list-item {
            position: relative;
            margin-top: 20px;
            width: 100%;
            background-color: #fff;
            .title {
                a:hover{
                    text-decoration: underline;
                }
            }
            .tags {
                margin-bottom: 10px;
                .tag-item {
                    margin-right: 10%;
                    &:last-child {
                        margin-right: 0;
                    }
                    .iconfont {
                        position: relative;
                        font-size: 16px;
                    }
                    .icon-user {
                        top: 2px;
                    }
                    .tag-text {
                        font-size: 14px;
                    }
                }
            }
            .item-img {
                margin-bottom: 15px;
                opacity: 1;
                transform: scale(1);
                transition: opacity .35s, transform .35s;
                &:hover {
                    opacity: 0.8;
                    transform: scale(1.1);
                }
            }
            .item-text {
                position: static;
                .btn {
                    position: absolute;
                    right: 10px;
                    bottom: 20px;
                }
            }
        }
        .pagination-wrapper{
            margin-top: 15px;
            background-color: #fff;
            text-align: center;
            .pagination {
                li {
                    cursor: pointer;
                }
            }
        }
    }
</style>
