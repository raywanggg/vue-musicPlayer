<template>
	<div class="reco-wrapper">
		<div class="reco-head">
			<p class="reco-title">歌单推荐</p>	
			<p class="reco-change">换一换<img src="../assets/image/reco-change.png" v-on:click="fetchSong"></p>
		</div>
		<ul class="reco-body">
			<li v-for="item in items">
				<router-link v-bind:to="item.href">
					<div class="reco-up">
						<img v-bind:src="item.cover" class="reco-cover">
						<div class="reco-wrap"></div>
						<span class="reco-liked"><img src="../assets/image/liked-3.png">{{ item.liked }}</span>
						<span class="reco-album">《{{ item.album }}》</span>
					</div>
					<p class="reco-down">
						<span class="reco-name">{{ item.name }}</span>
						<span class="reco-singer">{{ item.singer }}</span>
					</p>
				</router-link>
			</li>
		</ul>	
	</div>
</template>
<script>
	export default {
		name: "recommend",
		data: function() {
			return {
				items: []
			}
		},
		methods: {
			fetchSong: function() {
				this.$http.get('songs/recommend').then(function(data) {
					//歌曲路径
					this.items = data.body;
					this.items.map(function(value, index){
						value.cover = "src/assets/image/album/" + value["album_img"];
						value.href = "/song/" + value["id"];
						return value;
					});
				}, function(data) {
					console.log(data.msg);
				});
			}
		},
		created: function() {
			this.fetchSong();
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
	.reco-head {
		position: relative;
		width: 90%;
		height: 30px;
		margin: 5px auto;
		box-sizing: border-box;
		border-left: 5px solid #ea6f5a;
		/*border-bottom: 1px solid #ddd;
		box-shadow: 5px 5px 5px #ccc;*/
		p {
			position: absolute;
			line-height: 30px;
			height: 30px;
			top: 0;
			font-size: 15px;
			color: #666;
			cursor: default;
		}
		.reco-title {
			left: 8px;
		}
		.reco-change {
			right: 2px;
			img {
				cursor: pointer;
				margin-left: 3px;
				margin-top: -2px;
			}
		}
	}
	.reco-body {
		margin: 10px;
		list-style: none;
		li {
			display: inline-block;
			box-sizing: border-box;
			width: calc(50% - 36px);
			margin: 0 16px 10px;
			border: 1px solid #dedede;
			box-shadow: 0 0 5px #ddd;
			cursor: pointer;
			.reco-up {
				width: 100%;
				position: relative;
				.reco-cover {
					width: 100%;
				}
				.reco-wrap {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 30px;
					background: linear-gradient(to top, transparent, black);
					opacity: 0.4;
				}
				span {
					position: absolute;
					color: #fff;
					font-size: 14px;
					top: 5px;
				}
				.reco-liked {
					left: 3px;
					img {
						width: 24px;
						height: 24px;
						margin-top: -5px;
					}
				}
				.reco-album {
					right: -3px;
				}
			}
			.reco-down {
				width: 100%;
				span {
					padding: 0 10px;
					display: block;
					height: 25px;
					line-height: 25px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: left;
				}
				.reco-name {
					font-size: 16px;
					color: #222;
				}
				.reco-singer {
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
</style>