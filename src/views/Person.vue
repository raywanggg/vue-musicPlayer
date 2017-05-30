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
			<p><span>歌曲列表</span></p>
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
				console.log(data.body.data);
				self.playlist = [];
				self.items.map(function(value, index){
					console.log(value);
					self.playlist[index] = value["id"];
					value.href = "/song/" + value["id"];
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
				console.log("ok");
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
	.reco-wrapper {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.per-body {
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