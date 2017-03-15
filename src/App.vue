<template>
	<div id="app">
		<div class="home-wrapper">
			<transition name="turn-page" mode="out-in">
				<div v-if="isShow" @click="isShow = !isShow" class="home-front" key="show1">
					<div class="welcome-back"></div>
					<div class="welcome-text">
						<img src="src/assets/image/home-logo.png">
						<h1>{{ msg }}</h1>
					</div>
					<router-view></router-view>
				</div>
				<div v-else style="background: lightblue;" class="home-back" key="show2">
					<h1 style="text-align: center;">this is search page!</h1>
				</div>
			</transition>

			<!-- <div @click="isShow = !isShow" v-bind:class="[isShow? '':'front-turn']" class="home-front">
				<div class="welcome-back"></div>
				<div class="welcome-text">
					<img src="src/assets/image/home-logo.png">
					<h1>{{ msg }}</h1>
				</div>
				<router-view></router-view>
			</div>
			<div  style="background: lightblue;" v-bind:class="[isShow? '':'back-turn']" class="home-back">
				<h1 style="text-align: center;">this is search page!</h1>
			</div> -->
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
	}
}
</script>
<style>
	@import "../css/common";
	/*.front-turn {
		transform: rotateY(180deg) !important;
		
	}
	.back-turn {
		transform: rotateY(0deg) !important;
		
	}*/

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