<template>
    <div class="editor" id="edit">
    </div>
</template>
<script type="text/javascript">
import E from 'wangeditor';
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
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
</style>
