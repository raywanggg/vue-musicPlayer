<template>
	<div id="app">
		<div class="welcome-text">
			<img src="src/assets/image/home-logo.png">
			<h1>vue音乐&nbsp&nbsp享生活</h1>
		</div>
		<div>
			<!-- 版权信息 -->
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	
}
</script>
<style>
	@import "../css/common";
	#app {
		display: block;
		margin: 5px auto auto;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background: #ededed;
		min-height: 650px;
		max-height: 100%;
		box-sizing: border-box;
		.welcome-text {
			margin: 100px auto; 
			width: 300px;
			height: 200px;
			img {
				width: 128px;
				height: 128px;
				display: block;
				margin: 0 auto;
			}
			h1 {
				text-align: center;
				color: #fff;
    			text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.3), 0 3px 5px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.25);
			}
		}
	}
	@media (min-width: 1024px) {
		#app {
			width: 420px;
		}
	}
	@media (max-width: 1023px) {
		#app {
			width: 100%;
		}
	}
</style>