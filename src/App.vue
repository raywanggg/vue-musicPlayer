<template>
	<div id="app">
		<div class="home-wrapper">
			<transition name="turn-page" mode="out-in" v-on:enter="toggleRouter">
				<div v-if="isShow" @click="isShow = !isShow" class="home-front" key="show1">
					<div class="welcome-back"></div>
					<div class="welcome-text">
						<img src="src/assets/image/home-logo.png">
						<h1>{{ msg }}</h1>
						<h3>轻触进入</h3>
					</div>
				</div>
				<div v-else class="home-back" key="show2">
					<router-view name="app"></router-view>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	name: "welcome",
	data: function() {
		return {
			msg: "vue音乐  享生活",
			isShow: true
		}
	},
	methods: {
		toggleRouter: function() {
			this.$router.push("home/recommend");
		}
	}
}
</script>
<style>
	@import "../css/common";
	#home {
		height: calc(100% - 110px);
	}
	.turn-page-leave-active {
	  	transform: rotateY(90deg);
	}
	.turn-page-enter {
		transform: rotateY(-90deg);
	}
	.turn-page-enter-active, .turn-page-leave-active {
		transition: transform 0.6s;
	}

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
			/*transition: 0.6s;*/
			transform-style: preserve-3d;
			transform-origin: 50% 100%;
			box-sizing: border-box;
			.home-front, .home-back {
				position: absolute; 
				width: 100%;
				height: 100%;
				backface-visibility: hidden;
				transform-style: preserve-3d;
				top: 0;
				left: 0;
			}
			.home-front {
				z-index: 2;
			}
			/*.home-back {
				transform: rotateY(-180deg);
			}*/
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
			margin: 100px auto auto; 
			width: 300px;
			height: calc(100% - 100px);
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
			h3 {
				position: absolute;
				text-align: center;
				color: #ea6f5a;
				font-style: italic;
				bottom: 50px;
				left: 0;
				right: 0;
			}
		}
		/*.front-turn {
			transform: rotateY(180deg) !important;
		
		}
		.back-turn {
			transform: rotateY(0deg) !important;
			
		}*/
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