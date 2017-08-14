<template>
	<div class="labels">
		<h3 class="title h4">
			<i class="label-icon iconfont icon-tag"></i>我的标签
		</h3>
		<ul class="labels">
			<li v-for="item in labels" class="label-item" :class="item.type" v-text="item.name" :label-id="item._id" @click="getByLabel"></li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				labels: []
			}
		},
		created() {
			this.getAllLabels();
		},
		methods: {
			getAllLabels() {
                this.$http.get('/label/getAll/').then((response) => {
                    response = response.body;
                    this.labels = response.labels;
                });
            },
            getByLabel(event) {
            	let label = event.target.getAttribute('label-id');
            	let labelName = event.target.innerHTML;
            	window.location.href = 'http://localhost:8000/front_stage/#/label/search/?label=' + label + '&labelname=' + labelName;
            }
		}
	}
</script>
<style lang="scss" rel="stylesheet/sass" scoped>
	.labels {
		.title {
			line-height: 20px;
			height: 20px;
			color: #756F71;
			.label-icon {
				font-size: 18px;
				margin-right: 10px;
			}
		}
		.labels {
			padding: 10px 20px;
			border: 1px solid #ccc;
			.label-item {
				display: inline-block;
				padding: 5px 10px;
				margin: 0 5px 5px 0;
				border-radius: 5px;
				font-size: 14px;
				font-family: "SimSun";
				color: #fff;
				cursor: pointer;
				transition: all 0.5s ease 0s;
				&:hover {
					border-radius: 0;
				}
			}
			.type1 {
				background-color: #43AC6A;
				&:hover {
					background-color: #028231;
				}
			}
			.type2 {
				background-color: #F3A557;
				&:hover {
					background-color: #E97705;
				}
			}
			.type3 {
				background-color: #F25E45;
				&:hover {
					background-color: #D82508;
				}
			}
			.type4 {
				background-color: #34AFD8;
				&:hover {
					background-color: #0583AC;
				}
			}
		}
	}
</style>