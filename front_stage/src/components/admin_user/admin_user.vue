<template>
    <div class="admin-comment">
        <pathNav></pathNav>
        <div class="list-wrapper">
            <table class="table table-bordered table-hover table-responsive">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>电话号码</th>
                        <th>头像</th>
                        <th>权限</th>
                        <th>更新日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(userItem, index) in users">
                        <td>{{index + 1}}</td>
                        <td>{{userItem.name}}</td>
                        <td>{{userItem.password}}</td>
                        <td>{{userItem.telephone}}</td>
                        <td>{{userItem.head}}</td>
                        <td>{{userItem.role}}</td>
                        <td>{{userItem.updatetime}}</td>
                        <td>
                            <!-- <a class="btn btn-success btn-xs" role="button" href="#" :data-id="wordItem._id" @click.prevent="setId" data-toggle="modal" data-target="#updateModal">更新</a> -->
                            <a class="btn btn-danger btn-xs" role="button" href="#" :data-id="userItem._id" @click.prevent="setId" data-toggle="modal" data-target="#deleteModal">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="deleteModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">内容删除</div>
                        <div class="modal-body">
                            确认删除此条留言？
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" type="button" data-dismiss="modal">取消</button>
                            <button class="btn btn-danger" @click.prevent="deleteUser" data-dismiss="modal">确定</button>
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
                users: [],
                currentUserId: '',
                editorContent: '',
                editor: {},
                totalPage: 0,
                currentPage: 0
            }
        },
        created() {
            this.getAllUsers();
        },
        methods: {
            setId(event) {
                this.currentUserId = event.target.getAttribute('data-id');
            },
            deleteUser(event) {
                let id = this.currentUserId;
                if (id !== '') {
                    this.$http.delete('/user/delete?id=' + id).then((response) => {
                        response = this.handleDate(response.body);
                        if (response.msg = SUCCESS_CODE) {
                            this.users = response.users;
                        }
                    });
                }
            },
            handleDate(object) {
                object.users.forEach(function(article) {
                    article.updatetime = moment(article.meta.updateAt).format('YYYY-MM-DD');
                });
                return object;
            },
            getAllUsers(pageCount) {
                let url = '/user/list';
                if (pageCount) {
                    url += '?p=' + pageCount;
                }
                this.$http.get(url).then((response) => {
                    response = this.handleDate(response.body);
                    console.log(response.users[0]);
                    if (response.msg = SUCCESS_CODE) {
                        this.users = response.users;
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
                this.getAllUsers(pageCount);
            }
        },
        components: {
            'pathNav': pathNav
        }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
.admin-comment {
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
                max-width: 400px;
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
