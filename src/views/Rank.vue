<template>
	<div class="rank-wrapper">
		<div v-for="(Item, Index) in items" class="rank-sort">
			<div class="rank-left">
				<p>{{ title[Index] }}</p>	
				<img v-bind:src="image[Index]">
			</div>
			<div class="rank-right">
				<ul>
					<li v-for="(item, index) in Item">
						<router-link v-bind:to="item.href">
							<span class="rank-song">{{ index+1 }}.{{ item.name }}</span>
							<span class="rank-singer"> - {{ item.singer }}</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "rank",
		data: function() {
			return {
				items: [],
				title: ["时下流行", "影视金曲", "怀旧经典"],
				image: ["src/assets/image/sort_1.jpg", "src/assets/image/sort_2.jpg", "src/assets/image/sort_3.jpg"]
			}
		},
		methods: {
			fetchSong: function() {
				this.$http.get('songs/rank').then(function(data) {
					//歌曲路径
					this.items = data.body;
					this.items.map(function(value, index){
						value.map(function(val, index){
							val.href = "/song/" + val["id"];
							return val;
						});
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
	.rank-wrapper {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.rank-sort {
		width: 92%;
		height: 210px;
		margin: 15px auto;
		box-sizing: border-box;
		border-bottom: 1px solid #dedede;
		.rank-left {
			height: 100%;
			float: left;
			img {
				width: 160px;
				height: 160px;
				cursor: default;
			}
			p {
				display: block;
				border-left: 5px solid #ea6f5a;
			    margin: 5px;
				font-size: 16px;
				color: #666;
				line-height: 25px;
			    text-indent: 10px;
			    text-align: left;
			}
		}
		.rank-right {
			height: 100%;
			margin: 5px 5px 5px 170px;
			overflow: auto;
			ul {
				padding-top: 30px;
				li {
					cursor: pointer;
					padding: 5px;
					font-size: 17px;
					line-height: 35px;
					.rank-song {
						color: #333;
					}
					.rank-singer {
						color: #999;
					}
				}
			}
		}
	}
</style>