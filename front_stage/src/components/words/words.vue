<template>
    <div class="words-wrapper">
        <div class="words-list">
            <div class="media words-item" v-for="word in words">
                <div class="media-left">
                    <img :src="'/static/user_head/' + word.from.head" />
                </div>
                <div class="media-body">
                    <p class="info-area">
                        <span class="name">{{word.from.name}}</span>
                        <span class="time">{{word.updatetime}}</span>
                        <span class="platform form">{{word.platform}}</span>
                        <!-- <span class="place"></span> -->
                    </p>
                    <p class="words-content" v-html="word.content"></p>
                </div>
            </div>
        </div>
        <div class="edit-container">
            <div id="edit" class="editor">
            </div>
            <transition name="fade">
                <div class="alert alert-warning alert-dismissible" role="alert" v-show="showAlert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" @click.stop.prevent="hideAlertInfo">&times;</span></button>
                    <strong>{{alertInfo}}</strong>
                </div>
            </transition>
        </div>
        <button class="btn btn-success" type="button" @click.prevent="commitWords">提交留言</button>
    </div>
</template>
<script>
import E from 'wangeditor';
import moment from 'moment';
const ERROR_OK = 0;
const SUCCESS_CODE = 1;
export default {
    data() {
            return {
                editor: {},
                user: {
                    isLogin: false,
                    name: '',
                    id: ''
                },
                words: [],
                editorContent: '',
                alertInfo: '',
                showAlert: false,
                platform: ''
            }
        },
        created() {
            this.isLogin();
            this.getAllWords();
        },
        mounted() {
            this.editor = new E('#edit');
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            this.editor.create();
        },
        methods: {
            isLogin() {
                this.$http.get('/user/isLogin/').then((response) => {
                    response = response.body;
                    if (response.errorno === ERROR_OK) {
                        this.user.isLogin = response.loginStatus;
                        this.user.name = response.username;
                        this.user.id = response.userId;
                    }
                }, (response) => {
                    console.log('error');
                });
            },
            hideAlertInfo() {
                let _this = this;
                setTimeout(function() {
                    _this.showAlert = false;
                }, 2000);
            },
            getAllWords() {
                this.platform = navigator.platform;
                this.$http.get('/words/all').then((response) => {
                    response = response.body;
                    console.log(response);
                    response.words.forEach(function(comment) {
                        comment.updatetime = moment(comment.meta.updateAt).format('YYYY-MM-DD HH:MM:SS');
                    });
                    console.log(response.msg);
                    if (response.msg === SUCCESS_CODE) {
                        this.words = response.words;
                        console.log(this.words);
                    }
                }, (error) => {
                    console.log('error');
                });
            },
            commitWords() {
                if (this.user.isLogin) {
                    console.log(this.editorContent);
                    if (this.editorContent === '') {
                        this.alertInfo = '留言内容不能为空！';
                        this.showAlert = true;
                        this.hideAlertInfo();
                    } else {
                        this.$http.post('/words/commit', {
                            'from': this.user.id,
                            'content': this.editorContent,
                            'platform': this.platform
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            response = response.body;
                            if (response.dataCode === SUCCESS_CODE) {
                                this.editor.txt.clear();
                                this.editorContent = '';
                                this.getAllWords();
                                this.alertInfo = response.msg;
                                this.showAlert = true;
                                this.hideAlertInfo();
                            }
                        }, (err) => {
                            console.log('error');
                        });
                    }
                } else {
                    this.alertInfo = '前登录后进行留言！';
                    this.showAlert = true;
                    this.hideAlertInfo();
                }
            }
        }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
.words-wrapper {
    .words-list {
        .words-item {
            margin-bottom: 15px;
            padding: 20px 15px;
            border: 1px solid #ccc;
            background-color: #fff;
            color: #756F71;
            .media-left {
                margin-right: 5px;
                border-radius: 50%;
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
            .media-body {
                padding-left: 5px;
                font-size: 14px;
                .info-area {
                    margin-bottom: 10px;
                    color: #F3A557;
                    span {
                        margin-right: 10px;
                    }
                    .form {
                        color: #fff;
                        padding: 2px 3px;
                        background-color: #5CB85C;
                        border-radius: 5px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .edit-container {
        position: relative;
        margin: 50px 0 10px 0;
        background-color: #fff;
        .editor {}
        .alert {
            position: absolute;
            top: 40%;
            left: 40%;
            button {
                z-index: 10000;
            }
        }
        .fade-enter {
            opacity: 0;
        }
        .fade-enter-active {
            transition: all .5s linear;
        }
        .fade-leave {
            opacity: 1;
        }
        .fade-leave-active {
            transition: all .5s linear;
            opacity: 0;
        }
    }
}
</style>
