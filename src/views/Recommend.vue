<template>
	<div class="reco-wrapper">
		<ul>
			<li v-for="item in items">
				<div class="reco-up">
					<img v-bind:src="item.cover" class="reco-cover">
					<div class="reco-wrap"></div>
					<span class="reco-liked"><img src="../assets/image/liked-2.png">{{ item.liked }}</span>
					<span class="reco-album">《{{ item.album }}》</span>
				</div>
				<p class="reco-down">
					<span class="reco-name">{{ item.name }}</span>
					<span class="reco-singer">{{ item.singer }}</span>
				</p>
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
			fetch: function() {
				this.$http.get('songs/recommend').then(function(data) {
					console.log(data);
					this.items = data.body;
					this.items.map(function(value, index){
						value.cover = "src/assets/image/album/" + value["album_img"];
						return value;
					});
				}, function(data) {
					console.log(data.msg);
				});
			}
		},
		created: function() {
			this.fetch();
		}
	}
</script>
<style scoped>
	@import "../../css/common";
	/*.reco-wrapper {
		width: 100%;
		height: ;
		overflow-y: auto;
	}*/
	ul {
		margin: 10px;
		list-style: none;
		li {
			display: inline-block;
			box-sizing: border-box;
			width: calc(50% - 30px);
			margin: 0 12px 10px;
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
					right: 0;
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