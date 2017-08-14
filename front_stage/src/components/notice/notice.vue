<template>
    <div class="notice">
       <div class="wrapper">
    		<i class="iconfont icon-notice"></i>
    		<span>博客系统更新</span>
       </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'This is test'
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
	.notice {
		.wrapper {
			padding: 5px 5px;
			background-color: #dff0d8;
			border:1px solid #d6e9c6; 
			font-size: 14px;
			color: #3c763d;
			.icon-notice {
				position: relative;
				top: 2px;
				margin-right: 5px;
			}
		}
	}
</style>
