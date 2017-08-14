<template>
    <div class="home">
        <pathNav></pathNav>
        <div class="alert alert-info alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            欢迎使用本系统 <strong class="stress">DS_Blog Admin</strong> . 请遵循使用规则，谢谢！
        </div>
        <div class="row-fluid">
            <div class="span12 center" style="text-align: center;">
                <ul class="stat-boxes">
                    <li>
                        <div class="left peity_bar_good"><span><span style="display: none;">2,4,9,7,12,10,12</span>
                            <span class="titles">文章总数</span>
                            </span>Articles</div>
                        <div class="right">
                            <strong>7</strong> Browse
                        </div>
                    </li>
                    <li>
                        <div class="left peity_bar_neutral"><span><span style="display: none;">20,15,18,14,10,9,9,9</span>
                            <span class="titles">评论总数</span>
                            </span>Comments</div>
                        <div class="right">
                            <strong>10</strong> Commit
                        </div>
                    </li>
                    <li>
                        <div class="left peity_bar_bad"><span><span style="display: none;">3,5,9,7,12,20,10</span>
                            <span class="titles">留言总数</span>
                            </span>Words</div>
                        <div class="right">
                            <strong>4</strong> Commit
                        </div>
                    </li>
                   <!--  <li>
                        <div class="left peity_line_good"><span><span style="display: none;">12,6,9,23,14,10,17</span>
                            <span class="titles">访问总数</span>
                            </span>Visit</div>
                        <div class="right">
                            <strong>300</strong> Orders
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="version-info row-fluid">
            <div class="span6">
                <div class="widget-box">
                    <div class="widget-title"><span class="icon"><i class="icon-file"></i></span>
                        <h5>程序信息</h5>
                        <!-- <span class="label label-info tip-left" data-original-title="54 total posts">54</span> --></div>
                    <div class="widget-content nopadding">
                        <ul class="recent-posts">
                            <li>
                                服务器环境：<span class="info-value">基于Node.js的内置http服务器</span>
                            </li>
                            <li>
                                Node.js版本：<span class="info-value">v6.8.1</span>
                            </li>
                            <li>
                                Express版本：<span class="info-value">v4.13.4</span>
                            </li>
                            <li>
                                数据库信息：<span class="info-value">3.4.1</span>
                            </li>
                            <li>
                                作者：<span class="info-value">姜东升</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="span6">
                <div class="widget-box">
                    <div class="widget-title"><span class="icon"><i class="icon-comment"></i></span>
                        <h5>系统版本</h5></div>
                    <div class="widget-content nopadding">
                        <ul class="recent-comments">
                            <li>
                                <span class="info-value">修复评论提交异常的bug</span>
                            </li>
                            <li>
                                <span class="info-value">登录异常修复</span>
                            </li>
                            <li>
                                <span class="info-value">更新express版本</span>
                            </li>
                            <li>
                                <span class="info-value">修复全站搜索失效bug</span>
                            </li>
                            <li>
                                <span class="info-value">添加统计功能</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer" class="span12">
            © 2016 - 2017 东升博客 & 版权所有
        </div>
    </div>
</template>
<script type="text/javascript">
    import pathNav from 'components/path_nav/path_nav.vue';
    export default {
        components: {
            pathNav: pathNav
        }
    }
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import "../../../static/css/bootstrap-responsive.min.css";
.home {
    #breadcrumb {
        margin-bottom: 20px;
    }
    .alert {
        padding: 5px 0;
        margin: 0 auto;
        width: 95%;
        text-align: center;
        font-size: 14px;
        .close {
            right: 21px;
        }
        .stress {
            font-family: "Microsoft Yahei";
            font-weight: bolder;
        }
    }
    .row-fluid {
        margin: 20px 0;
        .titles {
            width: 50px;
            height: 27px;
        }
    }
    .version-info {
        padding: 0 15px;
        .widget-title h5 {
            font-size: 16px;
        }
        .widget-title span.icon {
            padding-top: 7px;
        }
        li {
            font-size: 14px;
            .info-value {
                color: #2197D2;
            }
        }
        [class^="icon-"],
        [class*=" icon-"] {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-top: 1px;
            line-height: 14px;
            vertical-align: text-top;
            background-image: url("../../../static/img/glyphicons-halflings.png");
            background-position: -24px -24px;
            background-repeat: no-repeat;
        }
    }
    .span12 {
        margin-left: 0;
        padding-bottom: 30px;
        font-size: 14px;
    }
}
</style>
