<template>
	<div id="app">
		<div class="home-wrapper">
			<div class="home-front">
				<div class="welcome-back"></div>
				<div class="welcome-text">
					<img src="src/assets/image/home-logo.png">
					<h1>{{ msg }}</h1>
				</div>
				<div>
					<!-- 版权信息 -->
				</div>
				<router-view></router-view>
			</div>
			<div class="home-back">
				<h1>this is a test</h1>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "welcome",
	data: function() {
		return {
			msg: "vue音乐  享生活"
		}
	}
}
</script>
<style>
	@import "../css/common";
	/*#app:hover .home-front {
		transform: rotateY(180deg);
	}
	#app:hover .home-back {
		transform: rotateY(0deg);
	}
	.front-turn {
		transform: rotateY(180deg);
	}
	.back-turn {
		transform: rotateY(0deg);
	}*/
	#app {
		--webkit-perspective: 1000;
		display: block;
		overflow: hidden;
		box-sizing: border-box;
		margin: 5px auto auto;
		border: 1px solid #ccc;
		border-radius: 5px;
		.home-wrapper {
			position: relative;
			transition: 0.6s;
			transform-style: preserve-3d;
			transform-origin: 50% 100%;
			box-sizing: border-box;
			.home-front, .home-back {
				position: absolute; 
				width: 100%;
				height: 100%;
				backface-visibility: hidden;
				transition: 0.6s; 
				transform-style: preserve-3d;
				top: 0;
				left: 0;
			}
			.home-front {
				z-index: 2;
			}
			.home-back {
				transform: rotateY(-180deg);
			}
		}
		.welcome-back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: url("../src/assets/image/food2.jpg") no-repeat fixed center/cover;
			filter: blur(4px);
		}
		.welcome-text {
			position: relative;
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
				color: #ea6f5a;
				/*text-shadow: 2px 2px 4px #dedede;*/
				text-shadow: 3px 3px 6px #888;
			}
		}
	}
	@media (min-width: 1024px) {
		#app {
			width: 450px;
			height: 680px;
			.home-wrapper {
				width: 100%;
				height: 100%;
			}
		}
	}
	@media (max-width: 1023px) {
		#app {
			width: 100%;
			min-width: 360px;
			height: 100%;
			min-height: 540px;
			.home-wrapper {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>