<template>
    <div class="carousel">
        <div class="container">
            <ul class="hiSlider demo">
                <li data-title="DS博客正在努力建成中..." class="hiSlider-item">
                    <img src="../../common/images/banner_1.jpg" height="275" width="1250" alt="DS博客正在努力建成中...">
                </li>
                <li data-title="你所不知道的bug趣闻" class="hiSlider-item">
                    <img src="../../common/images/banner_2.jpg" alt="你所不知道的bug趣闻">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import hislider from 'common/js/jquery.hiSlider.min.js';
export default {
    mounted() {
        $('.demo').hiSlider({
            affectTime: 1000,
            isFlexible: true
        });
    }
}
</script>
<style lang="scss" type="stylesheet/sass" scoped>
    .carousel {
        margin: 0 0 20px;
        .swiper-wrapper {
            height: 275px;
            .swiper-slide {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .hiSlider {
            height: 275px;
        }
    }
</style>
