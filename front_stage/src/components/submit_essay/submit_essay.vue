<template>
    <div class="submit-wrapper">
    	<pathNav></pathNav>
    	<div class="container">
    		<div class="row">
		    	<form id="submit-form" class="form-horizontal" method="post" :action="'/admin/essay/commit?content=' + editorContent">
		    		<input type="hidden" name="label"/>
					<div class="form-group">
						<label class="col-md-2 control-label" for="inputSummary">随笔内容</label>
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
			editorContent: ''
		}
	},
    mounted() {
        let editor = new E('#edit');
        editor.customConfig.onchange = (html) => {
            this.editorContent = html;
        }
        editor.create();
    },
    methods: {
    	test() {
    		console.log(this.editorContent);
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
