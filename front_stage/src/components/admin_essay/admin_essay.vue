<template>
    <div class="admin-list">
        <pathNav></pathNav>
        <div class="list-wrapper">
            <table class="table table-bordered table-hover table-responsive">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>内容</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(essayItem, index) in essays">
                        <td>{{index + 1}}</td>
                        <td>{{essayItem.content}}</td>
                        <td>{{essayItem.updatetime}}</td>
                        <td>
                            <a class="btn btn-success btn-xs" role="button" href="#" :data-id="essayItem._id" @click.prevent="setId" data-toggle="modal" data-target="#updateModal">更新</a>
                            <a class="btn btn-danger btn-xs" role="button" href="#" :data-id="essayItem._id" @click.prevent="setId" data-toggle="modal" data-target="#deleteModal">删除</a>
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
                            <button class="btn btn-danger" @click.prevent="deleteEssay" data-dismiss="modal">确定</button>
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
                                <form class="form-horizontal" method="post" :action="'/essay/update?content=' + editorContent">
                                    <input type="hidden" name="id" :value="currentEssayId" />
                                    <div class="form-group">
                                        <label class="col-md-2 control-label" for="inputSummary">内容</label>
                                        <div id="edit" class="col-md-10 edit">
                                        </div>
                                    </div>
                                    <div class="form-group">
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
                essays: [],
                currentEssayId: '',
                editorContent: '',
                currentEssay: {},
                editor: {},
                totalPage: 0,
                currentPage: 0
            }
        },
        created() {
            this.getAllEssays();
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
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            this.editor.create();
        },
        methods: {
            setId(event) {
                this.currentEssayId = event.target.getAttribute('data-id');
                this.getUpdateContent();
            },
            deleteEssay(event) {
                let id = this.currentEssayId;
                if (id !== '') {
                    this.$http.delete('/essay/delete?id=' + id).then((response) => {
                        response = this.handleDate(response.body);
                        if (response.msg = SUCCESS_CODE) {
                            this.essays = response.essays;
                        }
                    });
                }
            },
            handleDate(object) {
                object.essays.forEach(function(essay) {
                    essay.updatetime = moment(essay.meta.updateAt).format('YYYY-MM-DD');
                });
                return object;
            },
            getUpdateContent() {
                this.$http.get('/essay/getone?id=' + this.currentEssayId).then((response) => {
                    response = response.body;
                    if (response.msg = SUCCESS_CODE) {
                        this.currentEssay = response.essay;
                        console.log(response.essay);
                        let essayObject = this.currentEssay;
                        this.editor.txt.html(essayObject.content);
                        this.editorContent = essayObject.content;
                    }
                }, (err) => {
                    console.log('err');
                });
            },
            getAllEssays(pageCount) {
                let url = '/essay/list';
                if (pageCount) {
                    url += '?p=' + pageCount;
                }
                this.$http.get(url).then((response) => {
                    response = this.handleDate(response.body);
                    console.log(response);
                    if (response.msg = SUCCESS_CODE) {
                        this.essays = response.essays;
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
                this.getAllEssays(pageCount);
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
                max-width: 300px;
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
