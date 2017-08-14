<template>
    <div class="admin-list">
        <pathNav></pathNav>
        <div class="list-wrapper">
            <table class="table table-bordered table-hover table-responsive">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>标题</th>
                        <th>作者</th>
                        <th>分类</th>
                        <th>图片地址</th>
                        <th>摘要</th>
                        <th>内容</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(articleItem, index) in articles">
                        <td>{{index + 1}}</td>
                        <td>{{articleItem.title}}</td>
                        <td>{{articleItem.author}}</td>
                        <td>{{articleItem.category}}</td>
                        <td>{{articleItem.img}}</td>
                        <td>{{articleItem.summary}}</td>
                        <td>{{articleItem.content}}</td>
                        <td>{{articleItem.updatetime}}</td>
                        <td>
                            <a class="btn btn-success btn-xs" role="button" href="#" :data-id="articleItem._id" :data-label="articleItem.label" @click.prevent="setId" data-toggle="modal" data-target="#updateModal">更新</a>
                            <a class="btn btn-danger btn-xs" role="button" href="#" :data-id="articleItem._id" @click.prevent="setId" data-toggle="modal" data-target="#deleteModal">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="deleteModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">内容删除</div>
                        <div class="modal-body">
                            确认删除此篇文章？
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" type="button" data-dismiss="modal">取消</button>
                            <button class="btn btn-danger" @click.prevent="deleteArticle" data-dismiss="modal">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="updateModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">内容更新</div>
                        <div class="modal-body clearfix">
                            <div class="col-md-12">
                                <form class="form-horizontal" method="post" :action="'/admin/article/update?category=' + currentCategory">
                                    <input type="hidden" :value="currentArticleId" name="id" />
                                    <input type="hidden" name="label" :value="labelId" />
                                    <input type="hidden" name="unchangedLabelId" :value="unchangedLabelId" />
                                    <input type="hidden" name="content" :value="editorContent" />
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputTitle">标题</label>
                                        <div class="col-md-10">
                                            <input id="inputTitle" class="form-control" type="text" name="title" :value="currentArticle.title">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputAuthor">作者</label>
                                        <div class="col-md-10">
                                            <input id="inputAuthor" class="form-control" type="text" name="author" :value="currentArticle.author">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputAuthor">分类</label>
                                        <div class="col-md-2">
                                            <!-- <input id="inputAuthor" class="form-control" type="text" name="author"> -->
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {{currentCategory || currentArticle.category}} <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="javascript:;" @click="changeCategory">前端开发</a></li>
                                                    <li><a href="javascript:;" @click="changeCategory">Node.js</a></li>
                                                    <li><a href="javascript:;" @click="changeCategory">技术之外</a></li>
                                                    <li><a href="javascript:;" @click="changeCategory">娱乐天地</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputImg">图片</label>
                                        <div class="col-md-10">
                                            <input id="inputImg" class="form-control" type="text" name="img" :value="currentArticle.img">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputAuthor">标签</label>
                                        <div class="col-md-2">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {{currentLabel}} <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu" style="z-index: 15000;">
                                                    <li v-for="label in labels">
                                                        <a href="javascript:;" @click="changeLabel" :labelId="label._id">{{label.name}}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputSummary">摘要</label>
                                        <div class="col-md-10">
                                            <input id="inputSummary" class="form-control" type="text" name="summary" :value="currentArticle.summary">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputSummary">内容</label>
                                        <div id="edit" class="col-md-10 edit">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <!--  <label class="col-md-2 control-label label-content" for="inputSummary">内容</label> -->
                                        <button type="submit" class="btn btn-primary">提交</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
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
<script type="text/javascript">
import moment from 'moment';
import pathNav from 'components/path_nav/path_nav.vue';
import E from 'wangeditor';

const SUCCESS_CODE = 1;
export default {
    data() {
            return {
                articles: [],
                currentArticleId: '',
                editorContent: '',
                currentCategory: '',
                currentArticle: {},
                editor: {},
                currentLabel: '',
                labels: [],
                labelId: '',
                unchangedLabelId: '',
                totalPage: 0,
                currentPage: 0
            }
        },
        created() {
            this.getAllLabels();
            this.getAllArticles();
        },
        mounted() {
            this.editor = new E('#edit');
            this.editor.customConfig.menus = [
                'head',
                'bold',
                'italic',
                'underline',
                'foreColor',
                'backColor',
                'justify',
                'emoticon',
                'image',
                'video',
                'code',
                'link'
            ];
            this.editor.customConfig.uploadFileName = 'static';
            this.editor.customConfig.uploadImgServer = '/upload';
            this.editor.customConfig.uploadImgParams = {
                token: 'dorsey'
            }
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            this.editor.create();
        },
        methods: {
            setId(event) {
                this.currentArticleId = event.target.getAttribute('data-id');
                this.labelId = event.target.getAttribute('data-label');
                this.unchangedLabelId = event.target.getAttribute('data-label');
                this.getUpdateContent();
            },
            deleteArticle(event) {
                let id = this.currentArticleId;
                if (id !== '') {
                    this.$http.delete('/manager/article/delete?id=' + id).then((response) => {
                        response = this.handleDate(response.body);
                        if (response.msg = SUCCESS_CODE) {
                            this.articles = response.articles;
                        }
                    });
                }
            },
            handleDate(object) {
                object.articles.forEach(function(article) {
                    article.updatetime = moment(article.meta.updateAt).format('YYYY-MM-DD');
                });
                return object;
            },
            changeCategory(event) {
                this.currentCategory = event.target.innerHTML;
            },
            getUpdateContent() {
                this.$http.get('/article/getone?id=' + this.currentArticleId).then((response) => {
                    response = response.body;
                    if (response.msg = SUCCESS_CODE) {
                        this.currentArticle = response.article[0];
                        this.currentLabel = this.currentArticle.label.name;
                        let articleObject = this.currentArticle
                        this.editor.txt.html(articleObject.content);
                        this.editorContent = articleObject.content;
                        this.currentCategory = articleObject.category;
                    }
                }, (err) => {
                    console.log('err');
                });
            },
            changeLabel(event) {
                this.currentLabel = event.target.innerHTML;
                this.labelId = event.target.getAttribute('labelid');
            },
            getAllLabels() {
                this.$http.get('/label/getAll/').then((response) => {
                    response = response.body;
                    this.labels = response.labels;
                });
            },
            getAllArticles(pageCount) {
                let url = '/manager/article/list/';
                if (pageCount) {
                    url += '?p=' + pageCount;
                }
                this.$http.get(url).then((response) => {
                    response = this.handleDate(response.body);
                    if (response.msg = SUCCESS_CODE) {
                        this.articles = response.articles;
                        this.totalPage = response.totalPage;
                        this.currentPage = response.currentPage;
                    }
                }, (err) => {
                    console.log('error');
                });
            },
            changePage(event, page) {
                if (page < 0 || page >= this.totalPage) {
                    return;
                }
                let pageCount = parseInt(event.target.innerHTML) - 1;
                if (page !== undefined) {
                    pageCount = page;
                }
                this.getAllArticles(pageCount);
            }
        },
        components: {
            'pathNav': pathNav
        }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
.admin-list {
    background-color: #fff;
    .list-wrapper {
        padding: 0 25px 0 10px;
        .table {
            th {
                text-align: left;
                font-size: 16px;
                font-weight: bold;
            }
            td {
                max-width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .modal-dialog {
            text-align: center;
        }
        #updateModal {
            .form-horizontal .control-label {
                width: 80px;
            }
            .form-horizontal .control-label {
                padding-top: 7px;
            }
            .label-content {
                visibility: hidden;
            }
        }
    }
    .pagination-wrapper {
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
