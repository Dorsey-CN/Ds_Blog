<template>
    <footer>
        <div class="footer-container container">
            <div class="row">
                <div class="program-relevant col-md-4">
                	<h3 class="h4 title">程序相关</h3>
                	<p class="foot-box">
                		<span class="foot-item">
                			<i class="iconfont icon-codingprogram"></i>程序：DS_Blog
                		</span>
                		<span class="foot-item">
                			<i class="iconfont icon-version"></i>版本：Beta1.0
                		</span>
                	</p>
                	<p class="foot-box">
                		<span class="foot-item">
                			<i class="iconfont icon-zuzhijiagou"></i>框架：Express4.x
                		</span>
                		<span class="foot-item">
                			<i class="iconfont icon-author"></i>作者：dorsey
                		</span>
                	</p>
                </div>
                <div class="program-rstatistics col-md-4">
                	<h3 class="h4 title">程序统计</h3>
                	<p class="foot-box">
                		<span class="foot-item">文章：7篇</span>
                		<span class="foot-item">评论：10条</span>
                	</p>
                	<p class="foot-box">
                		<span class="foot-item">建站：20天</span>
                		<span class="foot-item">留言：4条</span>
                	</p>
                	<!-- <p class="foot-box">
                		<span class="foot-item">访问：120次</span>
                		<span class="foot-item">友链：5条</span>
                	</p> -->
                </div>
                <div class="recommend-article col-md-4">
					<h3 class="h4 title">推荐文章</h3>
                	<p class="foot-box dashed-line">
                		<span class="foot-item">
                			<i class="iconfont icon-coffee"></i>
                			<a href="http://localhost:8000/front_stage/#/specific_content/594de83c4b21c638497b95c1">bootstrap鼠标悬停下拉菜单</a>
                		</span>
                	</p>
                	<p class="foot-box dashed-line">
                		<span class="foot-item">
                			<i class="iconfont icon-coffee"></i>
                			<a href="http://localhost:8000/front_stage/#/specific_content/594df9ce4b21c638497b95c9">开发博客阶段描述</a>
                		</span>
                	</p>
                	<p class="foot-box dashed-line">
                		<span class="foot-item">
                			<i class="iconfont icon-coffee"></i>
                			<a href="http://localhost:8000/front_stage/#/specific_content/594decdb4b21c638497b95c4">对照着jquery来学vue.js系列之案例篇</a>
                		</span>
                	</p>
                	<p class="foot-box dashed-line">
                		<span class="foot-item">
                			<i class="iconfont icon-coffee"></i>
                			<a href="http://localhost:8000/front_stage/#/specific_content/594df0174b21c638497b95c5">前端自动化系列(一)之node.js、npm、cnpm</a>
                		</span>
                	</p>
                </div>
            </div>
            <div class="copy-right">© 2016 - 2017 东升博客 & 版权所有</div>
        </div>
    </footer>
</template>
<script type="text/javascript">
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
	footer {
		padding: 20px 0;
		background: url(./bg-foot.gif) left top repeat;
		color: #ECECEC;
		.footer-container {
            .row {
                margin-bottom: 20px;
                .foot-box {
                    clear: both;
                    margin-top: 20px;
                    .foot-item {
                        margin-right: 20px;
                        font-size: 13px;
                        .iconfont {
                            position: relative;
                            margin-right: 5px;
                            top: 1px;
                        }
                        a {
                            color: #ECECEC;
                            cursor: pointer;
                            &:hover {
                                color: #5CB85C;
                            }
                        }
                    }
                }
                .recommend-article {
                    .foot-box {
                        padding-bottom: 10px;
                        border-bottom: 1px dashed #fff;
                    }
                }
            }	
			.copy-right {
				padding: 10px;
				background-color: #1F1F1F;
				text-align: center;
				font-size: 13px;
			}
		}
	}
</style>
