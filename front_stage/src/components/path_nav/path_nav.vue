<template>
    <div class="path-nav">
    	<div id="breadcrumb">
            <a href="#" class="tip-bottom" data-original-title="Go to Home"><i class="icon-home"></i>后台系统</a>
            <a href="#" class="current">{{currentPath}}</a>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                paths: {
                    'home': '系统首页',
                    'release': '内容发布',
                    'article': '文章管理',
                    'words': '留言管理',
                    'comment': '评论管理',
                    'essay': '随笔管理',
                    'user': '用户管理'
                },
                currentPath: ''
            }
        },
        created() {
            let currentHash = window.location.hash.split('/')[2];
            this.currentPath = this.paths[currentHash];
        }
    }
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
    .path-nav {
        margin-bottom: 20px;
    }
</style>
