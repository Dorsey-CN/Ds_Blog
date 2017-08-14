<template>
    <div class="essay-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div id="b-content">
                    <div class="col-xs-12 col-md-12 col-lg-12 b-chat" ref="chat">
                        <div class="b-chat-left" ref="last">
                            <ul v-for="(essay, index) in leftEssay" class="b-chat-one animated bounceInLeft">
                                <li class="b-chat-title ">{{essay.updatetime}}</li>
                                <li class="b-chat-content" v-html="essay.content"></li>
                                <div class="b-arrows-right1" style="top: 37.2px;">
                                    <div class="b-arrows-round"></div>
                                </div>
                                <div class="b-arrows-right2" style="top: 37.2px;"></div>
                            </ul>
                        </div>
                        <div class="b-chat-middle" ref="chatMiddle"></div>
                        <div class="b-chat-right">
                            <ul v-for="essay in rightEssay" class="b-chat-one animated bounceInRight">
                                <li class="b-chat-title ">{{essay.updatetime}}</li>
                                <li class="b-chat-content" v-html="essay.content"></li>
                                <div class="b-arrows-right1" style="top: 37.2px;">
                                    <div class="b-arrows-round"></div>
                                </div>
                                <div class="b-arrows-right2" style="top: 37.2px;"></div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
const SUCCESS_CODE = 1;
export default {
    data() {
            return {
                leftEssay: [],
                rightEssay: []
            }
        },
        created() {
            this.getAllEssays();
        },
        mounted() {},
        methods: {
            getAllEssays() {
                this.$http.get('/essay/getAll').then((response) => {
                    response = response.body;
                    console.log(response);
                    response.essays.forEach(function(essay) {
                        essay.updatetime = moment(essay.meta.updateAt).format('YYYY-MM-DD HH:MM:SS');
                    });
                    if (response.dataCode === SUCCESS_CODE) {
                        this.essays = response.essays;
                        let leftCount = Math.ceil(this.essays.length / 2);
                        for(var i = 0; i < this.essays.length; i ++) {
                            if(i < leftCount) {
                                this.leftEssay.push(this.essays[i]);
                            } else {
                                this.rightEssay.push(this.essays[i]);
                            }
                        }
                        this.$nextTick(() => {
                            let chat = this.$refs.chat;
                            let chatMiddle = this.$refs.chatMiddle;
                            chatMiddle.setAttribute('style', 'height:' + chat.offsetHeight + 'px');
                        });
                    }
                });
            },
            getByClassName(obj, className) {
                if (document.getElementByClassName) {
                    return document.getElementByClassName(className);
                }
                var nodes = document.getElementsByTagName("*");
                var arr = [];
                for (var i = 0; i < nodes.length; i++) {
                    if (hasClass(nodes[i], className)) arr.push(nodes[i]);
                }
                return arr;
            }
        }
}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
@import "../../common/css/animate.min.css";
.essay-wrapper {
    #b-content {
        .b-chat {
            padding: 25px 15px;
            background: #fff;
            overflow: hidden;
            .b-chat-one {
                margin-bottom: 50px;
                padding: 5px 10px;
                border: 1px solid #E2E2E2;
                border-radius: 6px;
                position: relative;
                .b-chat-title {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    color: #ccc;
                }
                .b-chat-content {
                    width: 100%;
                    line-height: 21px;
                }
            }
            .b-chat-left {
                width: 50%;
                float: left;
                .b-chat-one {
                    margin-right: 10px;
                    .b-chat-title {
                        text-align: left;
                    }
                    .b-chat-content {
                        text-align: left;
                    }
                    .b-arrows-right1 {
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 10px;
                        border-color: transparent transparent transparent #E2E2E2;
                        position: absolute;
                        right: -20px;
                        .b-arrows-round {
                            width: 10px;
                            height: 10px;
                            background: #F08A24;
                            border-radius: 50%;
                            position: absolute;
                            left: 0;
                            top: -4px;
                        }
                    }
                    .b-arrows-right2 {
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 10px;
                        border-color: transparent transparent transparent #fff;
                        position: absolute;
                        right: -19px;
                    }
                }
            }
            .b-chat-middle {
                width: 1%;
                background: #008CBA;
                border-radius: 4px;
                float: left;
            }
            .b-chat-right {
                padding-top: 70px;
                width: 49%;
                float: left;
                .b-chat-one {
                    margin-left: 10px;
                    .b-chat-title {
                        text-align: right;
                    }
                    .b-chat-content {
                        text-align: left;
                    }
                    .b-arrows-right1 {
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 10px;
                        border-color: transparent #E2E2E2 transparent transparent;
                        position: absolute;
                        left: -20px;
                        .b-arrows-round {
                            width: 10px;
                            height: 10px;
                            background: #F08A24;
                            border-radius: 50%;
                            position: absolute;
                            left: -10px;
                            top: -6px;
                        }
                    }
                    .b-arrows-right2 {
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 10px;
                        border-color: transparent #fff transparent transparent;
                        position: absolute;
                        left: -19px;
                    }
                }
            }
        }
    }
}
</style>
