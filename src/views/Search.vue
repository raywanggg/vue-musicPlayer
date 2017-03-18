<template>
	<div id="search">
		<div class="search-wrapper">
			<input id="searchInput" type="text" v-model="value" placeholder="输入歌曲名、歌手名或专辑名">
			<label for="searchInput">搜索</label>
		</div>
	</div>
</template>
<script>
export default {
	name: "search",
	data: function() {
		return {
			value: ""
		}
	}
}
</script>
<style>
	@import "../../css/common";
	#search {
		width: 100%;
		height: 70px;
		background: #ea6f5a;
		.search-wrapper {
			input {
				width: 70%;
			    height: 38px;
			    margin: 15px 20px;
			    border: 1px solid #ddd;
			    border-radius: 20px;
			    outline: none;
			    text-indent: 15px;
			}
			label {
				color: #fff;
				font-size: 20px;
				margin-left: 10px;
				cursor: pointer;
			}
		}
	}
</style>