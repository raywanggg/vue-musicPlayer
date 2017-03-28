<template>
	<div class="rank-wrapper">
		<div class="rank-sort rank-pop">
			<div class="rank-left">
				<p>时下流行</p>	
				<img src="../assets/image/sort_1.jpg">
			</div>
			<div class="rank-right">
				<!-- <p>时下流行</p> -->
				<ul>
					<li v-for="(item, index) in items[0]">{{ index+1 }}.{{ item.name }} - {{ item.singer }}</li>
				</ul>
			</div>
		</div>
		<div class="rank-sort rank-film">
			<div class="rank-left">
				<p>影视金曲</p>
				<img src="../assets/image/sort_2.jpg">
			</div>
			<div class="rank-right">
				<!-- <p>影视金曲</p> -->
				<ul>
					<li v-for="(item, index) in items[1]">{{ index+1 }}.{{ item.name }} - {{ item.singer }}</li>
				</ul>
			</div>
		</div>
		<div class="rank-sort rank-classic">
			<div class="rank-left">
				<p>怀旧经典</p>
				<img src="../assets/image/sort_3.jpg">
			</div>
			<div class="rank-right">
				<!-- <p>怀旧经典</p> -->
				<ul>
					<li v-for="(item, index) in items[2]">{{ index+1 }}.{{ item.name }} - {{ item.singer }}</li>
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
				items: []
			}
		},
		methods: {
			fetch: function() {
				this.$http.get('songs/rank').then(function(data) {
					//歌曲路径
					this.items = data.body;

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
			/*p {
				display: block;
				text-align: right;
				font-style: italic;
				font-size: 18px;
				color: #999;
				line-height: 20px;
			}*/
			ul {
				padding-top: 30px;
				li {
					cursor: pointer;
					padding: 5px;
					font-size: 17px;
					color: #666;
					line-height: 35px;
				}
			}
		}
	}
</style>