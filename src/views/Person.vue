<template>
	<div class="per-wrapper">
		<div class="per-head">
			<p class="per-intro">
				<img src="../assets/image/sort_5.jpg">
				<span>匿名用户</span>
			</p>	
			<div class="per-count">
				<p>收藏</p>
				<p>{{ count }}</p>
			</div>
		</div>
		<div class="per-body">
			<p class="collect-tab"><span>歌曲列表</span></p>
			<ul class="collect-lists">
				<li v-for="item in items">
					<router-link v-bind:to="item.href">
						<div class="result-left">
							<p class="result-name">{{ item.name }}</p>
							<p class="result-info">
								<span class="result-singer">{{ item.singer }}</span>
								<span class="result-album"> -《{{ item.album }}》</span>
							</p>
						</div>
						<div class="result-right">
							<img class="result-collect" v-bind:src="[item.isCollected == true ? remove : add]" v-on:click="collect(item.id, item.isCollected)">
							<img class="result-enter" src="../assets/image/enter.png">
						</div>
					</router-link>
				</li>
			</ul>	
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: "person",
	data: function() {
		return {
			items: [],//我的收藏
			count: 0,
			add: "src/assets/image/add2.png",
			remove: "src/assets/image/add3.png"
		}
	},
	computed: {
		playlist: {
			get() {
				return this.$store.state.playlist;
			},
			set(playlist) {
				this.$store.commit("listSet", playlist);
			}
		}
	},
	methods: {
		fetchLike: function() {
			this.$http.get('songs/mine').then(function(data) {
				//歌曲路径
				var self = this;
				self.items = data.body.data;
				// console.log(data.body.data);
				self.count = self.items.length;
				self.playlist = [];
				self.items.map(function(value, index){
					// console.log(value);
					self.playlist[index] = value["id"];
					value.href = "/song/" + value["id"];
					value.isCollected = true;
					return value;
				});
			}, function(data) {
				console.log(data.msg);
			});
		},
		collect: function(id, isCollected) {
			var event = event || window.event;
            // event.stopPropagation();//阻止冒泡
            event.preventDefault();//阻止默认行为
			this.$http.put('songs/collection/' + id).then(function(data) {
				this.fetchLike();
				// isCollected = !isCollected;//不能及时刷新 
			}, function(data) {
				console.log(data.msg);
			});
			
		}
	},
	created: function() {
		this.fetchLike();
	}
}
</script>
<style scoped>
	@import "../../css/common";
	.per-wrapper {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.per-head {
		padding: 5px;
    	height: 130px;
    	background-color: #efefef;
    	/* overflow: auto; */
		.per-intro {
			float: left;
			width: 65%;
			height: 100%;
			img {
				width: 110px;
				height: 110px;
				margin: 10px;
				border: 1px solid transparent;
				border-radius: 50%;
			}
			span {
				display: inline-block;
				line-height: 120px;
				font-size: 20px;
				color: #999;
			}
		}
		.per-count {
			float: left;
			width: 35%;
			font-style: italic;
			margin-top: 10px;
			margin-bottom: 10px;
			border-left: 1px solid #dedede;
			p {
				font-size: 18px;
				color: #666;
				height: 50px;
				line-height: 50px;
				text-indent: 20px;
			}
		}
	}
	.per-body {
		.collect-tab {
			width: 100%;
			height: 35px;
			font-size: 18px;
			margin-top: 5px;
			border-bottom: 2px solid var(--color-theme);
			cursor: default;
			span {
				display: inline-block;
				margin-left: 30px;
				height: 35px;
				line-height: 35px;
				margin-bottom: -2px;
				padding-left: 5px;
				padding-right: 5px;
				border: 2px solid var(--color-theme);
				border-bottom-color: #fff;
			}
		}
		.collect-lists {
			li {
				display: block;
				position: relative;
				margin: 5px 10px;
				box-sizing: border-box; 
				border-bottom: 1px solid #ededed;
				padding: 5px;
				.result-left {
					.result-name {
						font-size: 20px;
						color: #666;
						line-height: 30px;
					}
					.result-info {
						font-size: 13px;
						line-height: 20px;
						.result-singer {
							color: #333;
						}
						.result-album {
							color: #999;
						}
					}
				}
				.result-right {
					position: absolute;
					top: 5px;
					right: 0;
					line-height: 45px;
					img {
						width: 24px;
						height: 24px;
					}
					.result-collect {
						margin-right: 10px;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>