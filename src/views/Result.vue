<template>
	<div class="result-wrapper">
		<div class="result-history">
			<strong>最近搜索：</strong>
			<ul>
				<li v-for="list in lists" v-on:click="reSearch(list)">{{ list }}</li> 
			</ul>
		</div>
		<div v-show="isEmpty" class="result-empty">
			<img src="../assets/image/no-result2.png">	
			<p>暂无相关结果</p>
		</div>
		<div v-show="!isEmpty" class="result-wrap">
			<ul class="result-lists">
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
import { mapState, mapMutations } from 'vuex';
export default {
	name: "result",
	data: function() {
		return {
			lists: [],
			items: [],
			isEmpty: false,
			add: "src/assets/image/add2.png",
			remove: "src/assets/image/add3.png"
		}
	},
	computed: {
		value: {
			get() {
				return this.$store.state.keyword;
			},
			set(value) {
				this.$store.commit("keywordSet", value);
			}
		},
		playlist: {
			get() {
				return this.$store.state.playlist;
			},
			set(playlist) {
				this.$store.commit("listSet", playlist);
			}
		},
		...mapState({
			words: state => state.history 
		})
	},
	methods: {
		// ...mapMutations({
		// 	setKeyword: 'keywordSet' // 映射
		// }),
		getResult: function() {
			// this.setKeyword('fdf');
			//渲染列表
			this.$http.get('songs/search?key=' + this.value).then(function(data) {
				// console.log(data.body.data);
				var self = this;
				if (data.body.data.length != 0) {
					this.items = data.body.data;
					this.playlist = [];
					this.items.map(function(value, index){
						self.playlist[index] = value["id"];
						value.href = "/song/" + value["id"];
						return value;
					});
					this.isEmpty = false;
				} else {
					this.isEmpty = true;
				}
			}, function(data) {
				console.log(data.msg);
			});
			//历史记录
			this.lists = this.words;
		},
		reSearch: function(list) {
			this.value = list;
			this.getResult();
		},
		collect: function(id, isCollected) {
			var event = event || window.event;
            // event.stopPropagation();//阻止冒泡
            event.preventDefault();//阻止默认行为
			this.$http.put('songs/collection/' + id).then(function(data) {
				this.getResult();
				// isCollected = !isCollected;//不能及时刷新 
			}, function(data) {
				console.log(data.msg);
			});
			
		}
	},
	watch: {
		value: function(val) {
			//val是改变之后的value
			this.getResult();
		}
	},
	created: function() {
		this.getResult();
	}
}
</script>
<style>
	@import "../../css/common";
	.result-wrapper {
		width: 100%;
		height: 100%;
	}
	.result-wrap {
		height: calc(100% - 20px);
		overflow-y: auto;
		overflow-x: hidden;
	}
	.result-history {
		height: 60px;
		background: #fafafa;
		border-bottom: 1px solid #efefef;
		position: relative;
		strong {
			position: absolute;
		    top: 4px;
		    left: 5px;
			font-size: 16px;
			color: #333;
			font-weight: bold;
			line-height: 20px;
			cursor: default;
		}
		ul, li {
			display: inline-block;
		}
		ul {
			margin-left: 80px;
		}
		li {
			padding: 1px 8px;
			font-size: 16px;
			color: #666;
			margin: 0 5px;
			cursor: pointer;
			max-width: 100px;
			line-height: 25px;
			white-space: nowrap; 
			text-overflow: ellipsis;
			overflow: hidden;
		}
		li:hover {
			color: black;
		}
	}
	.result-empty {
		display: block;
		height: 200px;
		width: 100%;
		margin-top: 20px;
		cursor: default;
		img {
			display: block;
			margin: 5px auto;
		}
		p {
			font-size: 18px;
			color: #666;
			text-align: center;
		}
	}
	.result-lists {
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
</style>