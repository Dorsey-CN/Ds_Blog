<template>
    <div class="specific-wrapper">
    	<div class="article-content">
	    	<div class="head-area">
	    		<h3 class="title h4">{{article.title}}</h3>
	    		<div class="info-area">
	    			<span class="info-item">栏目：{{article.category}}</span>
	    			<span class="info-item">作者：{{article.author}}</span>
	    			<span class="info-item">阅读：(100)</span>
	    			<span class="info-item">更新于：{{article.updatetime}}</span>
	    		</div>
	    	</div>
	        <div class="content-area" v-html="article.content">
	        </div>
	        <div class="explain">
	        	<p>非特殊说明，本文版权归 东升博客 所有，转载请注明出处.</p>
	        	<p>本文标题：{{article.title}}</p>
	        	<p class="active">本文网址：{{pageUrl}}</p>
	        	<p class="active">本文标签：{{labelName}}</p>
	        </div>
	        <div class="pagination">
	        	<p v-show="preArticle.title">
	        		上一篇：<a :href="'http://localhost:8000/front_stage/#/specific_content/' + preArticle._id">{{preArticle.title}}</a>
	        	</p>
	        	<p v-show="!preArticle.title">上一篇：没有了</p>
	        	<p v-show="nextArticle.title">
	        		下一篇：<a :href="'http://localhost:8000/front_stage/#/specific_content/' + nextArticle._id">{{nextArticle.title}}</a>
	        	</p>
	        	<p v-show="!nextArticle.title">下一篇：没有了</p>
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
			<button class="btn btn-success" type="button" @click.prevent="commitComment">提交评论</button>
		</div>
		<div class="comment-list">
			<div class="top-area clearfix">
				<h3 class="title h4 pull-left">评论区</h3>
				<h3 class="title h5 pull-right">共有{{comments.length}}条评论</h3>
			</div>
			<div class="commit-item" v-for="comment in comments">
				<div class="comment-img">
					<img :src="'/static/user_head/' + comment.from.head" width="45" height="45" />
				</div>
				<div class="comment-content clearfix">
					<span class="specific-text">{{comment.from.name}}：</span>
					<p v-html="comment.content"></p>
					<span class="commit-time clearfix">{{comment.updatetime}}</span>
				</div>
			</div>
		</div>
    </div>
</template>
<script type="text/javascript">
import moment from 'moment';
import E from 'wangeditor';
import underscore from 'underscore.string';
const SUCCESS_CODE = 1;
const ERROR_OK = 0;
export default {
	data() {
        return {
        	editor: {},
        	user: {
                isLogin: false,
                name: '',
                id: ''
            },
            currentArticleId: '',
            article: {},
            pageUrl: '',
            nextArticle: {},
            preArticle: {},
            editorContent: '',
            showAlert: false,
            alertInfo: '',
            comments: [],
            labelName: ''
        }
    },
    created() {
    	this.isLogin();
    	this.getCurrentArticle();
        this.getNextArticle();
        this.getPreArticle();
        this.getAllComment();
    },
    mounted() {
        this.editor = new E('#edit');
        this.editor.customConfig.onchange = (html) => {
            this.editorContent = html;
        }
        this.editor.create();
    },
    watch: {
        '$route' (to, from) {
            this.getCurrentArticle();
            this.getNextArticle();
        	this.getPreArticle();
        	this.getAllComment();
        }
    },
    methods: {
    	isLogin() {
    		this.$http.get('/user/isLogin/').then((response) => {
                response = response.body;
                if(response.errorno === ERROR_OK) {
                    this.user.isLogin = response.loginStatus;
                    this.user.name = response.username;
                    this.user.id = response.userId;
                }
            }, (response) => {
                console.log('error');
            });
    	},
    	getCurrentArticle() {
    		this.pageUrl = window.location.href;
	        this.currentArticleId = window.location.hash.split('/')[2];
	        this.$http.get('/article/getone/?id=' + this.currentArticleId).then((response) => {
	        		let article = response.body.article[0];
	                article.updatetime = moment(article.meta.updateAt).format('YYYY-MM-DD HH:MM:SS');
	        		if(response.body.msg === SUCCESS_CODE) {
	        			console.log(underscore.unescapeHTML("&lt;div&gt;Blah&nbsp;blah blah&lt;/div&gt;"));
	        			this.article = article;
	        			this.labelName = this.article.label.name;
	        			console.log(this.labelName);
	        		}
	        }, (err) => {
	        	console.log('err');
	        });
    	},
    	getNextArticle() {
    		this.$http.get('/article/getNext/?id=' + this.currentArticleId).then((response) => {
	        		response = response.body;
	        		if(response.msg === SUCCESS_CODE) {
	        			if(response.next.length !== 0) {
	        				this.nextArticle = response.next[0];
	        			} else {
	        				this.nextArticle = {};
	        			}
	        		}
	        }, (err) => {
	        	console.log('err');
	        });
    	},
    	getPreArticle() {
    		this.$http.get('/article/getPre/?id=' + this.currentArticleId).then((response) => {
	        		response = response.body;
	        		if(response.msg === SUCCESS_CODE) {
	        			if(response.pre.length !== 0) {
	        				this.preArticle = response.pre[0];
	        			} else {
	        				this.preArticle = {};
	        			}
	        		}
	        }, (err) => {
	        	console.log('err');
	        });
    	},
    	hideAlertInfo() {
    		let _this = this;
    		setTimeout(function(){
				_this.showAlert = false;
			}, 2000);
    	},
    	getAllComment() {
    		this.$http.get('/comment/all?id=' + this.currentArticleId).then((response) => {
    			response = response.body;
    			response.comments.forEach(function(comment) {
                    comment.updatetime = moment(comment.meta.updateAt).format('YYYY-MM-DD HH:MM:SS');
                });
    			if(response.msg === SUCCESS_CODE) {
    				this.comments = response.comments;
    			}
    		}, (error) => {
    			console.log('error');
    		});
    	},
    	commitComment() {
    		if(this.user.isLogin){
    			console.log(this.editorContent);
    			if(this.editorContent === '') {
    				this.alertInfo = '评论内容不能为空！';
    				this.showAlert = true;
    				this.hideAlertInfo();
    			} else {
    				this.$http.post('/comment/commit', {'article': this.article._id, 'from': this.user.id, 'content': this.editorContent}, {emulateJSON:true}).then((response) => {
    						response = response.body;
    						if(response.dataCode === SUCCESS_CODE) {
    							this.editor.txt.clear();
    							this.editorContent = '';
    							this.getAllComment();
    							this.alertInfo = response.msg;
    							this.showAlert = true;
    							this.hideAlertInfo();
    						}
    				}, (err) => {
    					console.log('error');
    				});
    			}
    		} else {
    			this.alertInfo = '评论前请先登录！';
    			this.showAlert = true;
    			this.hideAlertInfo();
    		}
    	}
    }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
	.specific-wrapper {
		padding: 30px 0;
		box-shadow: 0 0 10px 7px rgba(218,218,218,.3);
		border: 1px solid #ccc;
		background-color: #fff;
		font-size: "Microsoft Yahei";
		.article-content {
			padding: 0 15px;
			.head-area {
				.title {
					color: #428bca;
				}
				.info-area {
					padding-bottom: 5px;
					border-bottom: 1px solid #ccc;
					.info-item {
						margin-right: 5px;
						font-size: 12px;
						color: #999;
					}
				}
			}
			.content-area {
				line-height: 24px;
				padding: 30px 0;
				font-size: 16px;
				color: #666;
				text-indent: 2em;
			}
			.explain {
				padding: 20px;
				line-height: 22px;
	    		text-shadow: 0 1px 0 rgba(255,255,255,.8);
				background-color: #f8f9f7;
				border: 1px solid #ECECEC;
				font-size: 14px;
				color: #787977;
				.active {
					color: #428bca;
				}
			}
			.pagination {
				width: 100%;
				padding: 20px;
				border-top: 1px solid #EEEEEE;
				border-bottom: 1px solid #EEEEEE;
				border-radius: 0;
				color: #756F71;
				a:focus {
					text-decoration: none;
					color: #337ab7;
				}
			}
			.edit-container {
				position: relative;
				.alert {
					position:absolute;
					top: 40%;
					left: 40%;
					button {
						z-index: 10000;
					}
				}
				.fade-enter{
			        opacity: 0;
			    }
			    .fade-enter-active{
			        transition: all .5s linear;
			    }
			    .fade-leave{
			        opacity: 1;
			    }
			    .fade-leave-active{
			        transition: all .5s linear;
			        opacity: 0;
			    }
			}
			.btn {
				margin-top: 10px;
			}
		}
		.comment-list {
			margin-top: 30px;
			color: #756F71;
			font-size: 14px;
			.top-area {
				padding: 0 15px;
				border-bottom: 2px solid #428bca;
			}
			.commit-item {
				display: flex;
				margin: 0 15px;
				padding: 5px 0;
				border-bottom: 1px solid #ccc;
				.comment-img {
					flex: 0 0 45px;
					margin-right: 20px;
					width: 45px;
					img {
						border-radius: 50%;
					}
				}
				.comment-content {
					flex: 1;
					.specific-text {
						float: left;
					}
					.commit-time {
						position: relative;
    					top: 10px;
					}
				}
			}
		}
	}
</style>
