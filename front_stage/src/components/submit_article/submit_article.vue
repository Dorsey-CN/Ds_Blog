<template>
    <div class="submit-wrapper">
    	<pathNav></pathNav>
    	<div class="container">
    		<div class="row">
		    	<form id="submit-form" class="form-horizontal" method="post" :action="'/admin/article/commit?category=' + currentCategory">
		    		<input type="hidden" name="label" :value="labelId"/>
		    		<input type="hidden" name="content" :value="editorContent"/>
					<div class="form-group">
						<label class="col-md-2 control-label" for="inputTitle">标题</label>
						<div class="col-md-10">
							<input id="inputTitle" class="form-control" type="text" name="title">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label" for="inputAuthor">作者</label>
						<div class="col-md-10">
							<input id="inputAuthor" class="form-control" type="text" name="author">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label" for="inputAuthor">分类</label>
						<div class="col-md-2">
							<!-- <input id="inputAuthor" class="form-control" type="text" name="author"> -->
							<div class="btn-group">
							  	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    {{currentCategory}} <span class="caret"></span>
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
							<input id="inputImg" class="form-control" type="text" name="img">
						</div>
					</div>
					<div class="form-group">
                        <label class="col-md-2 control-label" for="inputAuthor">标签</label>
                        <div class="col-md-2">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{currentLabel || currentArticle.category}} <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu" style="z-index: 15000;">
                                    <li v-for="label in labels">
                                    	<a href="javascript:;" @click="changeLabel" :labelId="label._id">{{label.name}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                   <!--  <div class="form-group">
						<label class="col-md-2 control-label" for="inputSummary">新标签</label>
						<div class="col-md-10">
							<input id="inputSummary" class="form-control" type="text">
						</div>
					</div> -->
					<div class="form-group">
						<label class="col-md-2 control-label" for="inputSummary">摘要</label>
						<div class="col-md-10">
							<input id="inputSummary" class="form-control" type="text" name="summary">
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-2 control-label" for="inputSummary">内容</label>
						<div id="edit" class="col-md-8 edit">
			        	</div>
		        	</div>
		        	<div class="form-group">
		        		<label class="col-md-2 control-label label-content" for="inputSummary">内容</label>
			        	<button type="submit" class="btn btn-primary" @click="test">提交</button>
			        	<button type="button" class="btn btn-danger">取消</button>
			        </div>
		    	</form>
	        </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import E from 'wangeditor';
import pathNav from 'components/path_nav/path_nav.vue';
export default {
	data() {
		return {
			editorContent: '',
			currentCategory: '请选择分类',
			currentLabel: '请选择标签',
			labels: [],
			labelId: ''
		}
	},
	created() {
		this.getAllLabels();
	},
    mounted() {
        let editor = new E('#edit');
        editor.customConfig.uploadFileName = 'static';
        editor.customConfig.uploadImgServer = '/upload';
        editor.customConfig.uploadImgParams = {
		    token: 'abcdef12345'
		}
        editor.customConfig.onchange = (html) => {
            this.editorContent = html;
            console.log(this.editorContent);
        }
        editor.create();
    },
    methods: {
    	test() {
    		console.log(this.editorContent);
    	},
    	changeCategory(event) {
    		this.currentCategory = event.target.innerHTML;
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
    	}
    },
    components: {
    	pathNav: pathNav
    }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
	.submit-wrapper {
		background-color: #fff;
		.form-horizontal .control-label {
			padding-top: 7px;
		}
		.edit {
			margin: 0 auto;
		}
		.label-content {
			visibility: hidden;
		}
	}
</style>
