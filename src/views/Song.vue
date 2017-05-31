<template>
	<div class="song-wrapper">
		<div id="song-back"></div>
		<div class="song-wrap">
			<div class="song-cover">
				<div class="song-head">
					<img src="../assets/image/backhome.png" class="song-return" v-on:click="pageReturn()">
					<img v-show="!isCollected" src="../assets/image/collect1.png" class="song-collect" v-on:click="songCollect()">
					<img v-show="isCollected" src="../assets/image/collect2.png" class="song-collect" v-on:click="songCollect()">
				</div>
				<div id="fc-wrapper" v-bind:class="[isCoverOpen? fcOpen: '', fcWrapper]">
					<!-- right-most handle piece -->
					<div class="fc-handle fc-handle-pull"></div>
					<div class="fc-perspective">
						<!-- right part overlay; get's darker -->
						<div class="fc-overlay fc-overlay-reverse"></div>
						<!-- middle handle piece -->
						<div class="fc-handle fc-handle-out"><div></div></div>
						<!-- inner bottom content part -->
						<div class="fc-bottom">
							<div class="fc-bottom-bg">
								<div class="fc-content">
									<!-- <p>song's name<span>song's singer</span></p> -->
									<p>{{ songInfo.name }}</p>
									<strong>-- 专辑《{{ songInfo.album }}》</strong>
									<div class="fc-content-span-wrap">
										<span>词：{{ songInfo.lyricist }}</span>
										<span>曲：{{ songInfo.composer }}</span>
										<span>唱：{{ songInfo.singer }}</span>
									</div>
								</div>
							</div>
							<div class="fc-overlay fc-overlay-solid"></div>
						</div><!-- fc-bottom end -->
						<!-- front and back of the flipping half -->
						<div class="fc-flip">
							<div class="fc-front">
								<div class="fc-inner">
									<div class="fc-overlay fc-overlay-left"></div>
									<!-- left-most part of handle -->
									<div class="fc-handle fc-handle-in"><div></div></div>
									<div class="fc-content">
										<h3>{{ songInfo.name }}</h3>
										<p>{{ songInfo.singer }}</p>
									</div>
								</div>
							</div><!-- fc-front end -->
							<div class="fc-back">
								<div class="fc-inner">
									<div class="fc-content">
										<div class="feynman" id="album-cover">
											<!-- <span>1918 &ndash; 1988</span> -->
										</div>
									</div>
									<div class="fc-overlay fc-overlay-right"></div>
								</div>
							</div><!-- fc-back end -->	
						</div><!-- fc-flip end -->		
					</div><!-- fc-perspective end -->
				</div>
			</div>
			<div class="song-lyric">
				<div class="lyric-content">
					<ul id="lyric-wrapper">
						<li v-for="item in lyricArray" v-bind:class="[item.isLinePlay? lyricHigh: '', lyricLine]">
							<span class="lyric-time">{{ item.m }}:{{ item.s }}:{{ item.ms }}</span>
							<span class="lyric-word">{{ item.content }}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="song-control">
				<audio id="audio" v-bind:src="songSrc" autoplay="autoplay" @timeupdate = "getSongOffset()"></audio>
				<div class="control-progress">
					<div class="progressBar">
						<div class="progressBac" id="progressBac"></div>
					    <div class="speed" id="speed"></div>
					    <div class="drag" id="drag"></div>
					</div>
					<div id="progressTime">
						<div class="timeDetail">
							<span class="currentTime" id="currentTime">{{ timeCurrent }}</span>/<span class="allTime" id="allTime">{{ timeAll }}</span>
						</div>
					</div>
				</div>
				<div class="control-button">
					<div class="button-mode">
						<img v-show="playMode == 0" src="../assets/image/mode-queue.png" v-on:click="modeControl()">
						<img v-show="playMode == 1" src="../assets/image/mode-random.png" v-on:click="modeControl()">
						<img v-show="playMode == 2" src="../assets/image/mode-single.png" v-on:click="modeControl()">
					</div>
					<div class="button-before">
						<img src="../assets/image/song-before.png" v-on:click="listControl(2)">
					</div>
					<div class="button-play">
						<img v-show="!isCoverOpen" src="../assets/image/song-play.png" v-on:click="playControl()">
						<img v-show="isCoverOpen" src="../assets/image/song-stop.png" v-on:click="playControl()">
					</div>
					<div class="button-next">
						<img src="../assets/image/song-next.png" v-on:click="listControl(1)">
					</div>
					<div class="button-list">
						<img src="../assets/image/song-list.png" v-on:click="listShow();isListshow = !isListshow">
					</div>
				</div>
			</div>
			<div v-if="isListshow" class="song-list">
				<p class="list-head">
					<span v-show="playMode == 0">列表循环（{{ listNum }}）</span>
					<span v-show="playMode == 1">随机播放（{{ listNum }}）</span>
					<span v-show="playMode == 2">单曲循环（{{ listNum }}）</span>
					<img src="../assets/image/mode-close.png" class="mode-close" v-on:click="isListshow = !isListshow">
				</p>
				<div class="list-body">
					<ul>
						<li v-for="item in listArray">
							<p v-bind:class="{isplaying: item.isPlay}">{{ item.name }}<span v-bind:class="{isplaying: item.isPlay}"> - {{ item.singer }}</span></p>
							<img src="../assets/image/song-delete.png" class="song-delete" v-on:click="listUpdate(item.id)">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data: function() {
		return {
			fcWrapper: "fc-wrapper",
			fcOpen: "fc-wrapper-open",
			lyricLine: "lyric-line",
			lyricHigh: "lyric-high",
			playMode: 0,
			isCoverOpen: true,
			songInfo: "",
			songSrc: "",
			lyricArray: [],
			allTime: 0,
			currentTime: 0,
			songId: "",
			preList: [],
			listArray: [],
			isCollected: false,
			isListshow: false,
			listNum: 0
			// startX: 0,//触摸坐标
			// moveX: 0,//滑动距离
			// aboveX: 0//上次滑动距离
			// timeId: ''
		}
	},
	computed: {
		proBar: {
			get() {
				return this.$store.state.progressBar;
			},
			set(proBar) {
				this.$store.commit("progress", proBar);
			}
		},
		preLine: {
			get() {
				return this.$store.state.lineMark;
			},
			set(preLine) {
				this.$store.commit("lineSet", preLine);
			}
		},
		timeAll: {
			get() {
				return this.$store.state.timeAll;
			},
			set(timeAll) {
				this.$store.commit("timeSetAll", timeAll);
			}
		},
		timeCurrent: {
			get() {
				return this.$store.state.timeCurrent;
			},
			set(timeCurrent) {
				this.$store.commit("timeSetCurrent", timeCurrent);
			}
		},
		playlist: {
			get() {
				return this.$store.state.playlist;
			}
		},
		pageflag: {
			get() {
				return this.$store.state.pageflag;
			}
		}
	},
	watch: {
		$route() {//路由没变监听id
			this.getSongInfo();
			this.playListener();
		}
	},
	methods: {
		//歌曲收藏
		songCollect: function() {
			this.$http.put('songs/collection/' + this.songId).then(function(data) {
				this.isCollected = !this.isCollected;
			}, function(data) {
				console.log(data.msg);
			});
		},
		//返回home页
		pageReturn: function() {
			clearInterval(this.timeId);
			console.log(this.$store.state.isSearch);
			if (!this.$store.state.isSearch) {
				switch(this.pageflag) {
					case 0: this.$router.push("/home/recommend"); break;
					case 1: this.$router.push("/home/rank"); break;
					case 2: this.$router.push("/home/person"); break;
				}
			} else {
				this.$router.push("/home/result");
			}
		},
		//时间转换
		toggleTime: function(time) {
		    var minutes = parseInt(time/60);
		    var seconds = parseInt(time%60);
		    if (minutes < 10) {
		        minutes = "0" + minutes;
		    }
		    if (seconds < 10) {
		        seconds = "0" + seconds;
		    }
		    var timeNew = "" + minutes + "" + ":" + "" + seconds + "";
		    return timeNew;
		},
		//模式控制
		modeControl: function() {
			this.playMode = (this.playMode + 1) % 3;
			if (this.playMode == 0) {//列表播放
				this.preList = this.playlist.slice(0);
			} else if (this.playMode == 1) {//随机播放
				this.preList = this.playlist.slice(0);
				this.preList.sort(function(a, b) {
					return Math.random() > 0.5 ? -1 : 1;
				});
			} else {//单曲循环
				this.preList = [this.songId];
			}
			console.log(this.preList);
			console.log(this.playlist);
		},
		//列表显示
		listShow: function() {
			this.$http.post('songs', this.preList).then(function(data) {
				var self = this;
				self.listNum = self.preList.length;
				console.log(data.body);
				if (data.body.length != 0) {
					self.listArray = data.body;
					self.listArray.map(function(value, index){
						if (value.id == self.songId) {
							return value.isPlay = true;
						} else {
							return value.isPlay = false;
						}
					});
				}
			}, function(data) {
				console.log(data.msg);
			});
		},
		//列表更新
		listUpdate: function(playId) {
			var self = this;
			if (playId == self.songId) {//关闭当前播放切换下首
				self.listControl(1);
			}
			//刷新数组
			self.preList = self.preList.filter(function(value, index) {
				if (value != playId) {
					return true;
				}
			});
			//重新渲染
			self.listShow();
		},
		//列表控制
		listControl: function(num) {
			var self = this;
			var audio = document.getElementById("audio");
			if (self.playMode == 2) {//单曲循环
				audio.currentTime = 0;
				self.getSongInfo();
				self.playListener();
			} else {//列表或者随机
				console.log(self.preList);
				if (num == 1) {//下一首
					for (var i = 0; i < self.preList.length; i++) {
						if (self.preList[i] == self.songId) {
							if (i == self.preList.length - 1) {
								self.songId = self.preList[0];
							} else {
								self.songId = self.preList[i + 1];
							}
							break;
						}
					}
				} else {//上一首
					for (var i = 0; i < self.preList.length; i++) {
						if (self.preList[i] == self.songId) {
							if (i == 0) {
								self.songId = self.preList[self.preList.length - 1];
							} else {
								self.songId = self.preList[i - 1];
							}
							break;
						}
					}
				}
				self.$router.push("/song/" + self.songId);
				// self.$router.go({name: "song", params: {id: self.songId}});//直接刷新
			}
		},
		//播放控制
		playControl: function() {
			var audio = document.getElementById("audio");
			if (this.isCoverOpen == true) {
				audio.pause();
			} else {
				audio.play();
				this.progressMove();
			}
			this.isCoverOpen = !this.isCoverOpen;
		},
		//进度条移动
		progressMove: function() {
			var self = this;
			var audio = document.getElementById("audio");
			var progressBac = document.getElementById("progressBac");
			var drag = document.getElementById("drag");
			var speed = document.getElementById("speed");
			this.proBar = progressBac.clientWidth;
			//进度条每隔0.5s刷新
			setInterval(function() {
				//this指向window
				self.proBar = progressBac.clientWidth;
		        drag.style.left = (audio.currentTime / audio.duration) * (self.proBar) + "px";
		        speed.style.left = -((self.proBar) - (audio.currentTime / audio.duration) * (self.proBar)) + "px";
		    }, 500);
		    // self.dragListener();
		},
		//拖动监听
		dragListener: function() {
			var self = this;
			var drag = document.getElementById("drag");
			drag.addEventListener("touchstart", self.touchStart, false);
			drag.addEventListener("touchmove", self.touchMove, false);
			drag.addEventListener("touchend", self.touchEnd, false);
		},
		touchStart: function(event) {
			event.preventDefault();
			this.startX = event.touches[0].pageX;//开始滑动
			// console.log(this.startX);
		},
		touchMove: function(event) {
			event.preventDefault();
			var drag = document.getElementById("drag");
			var speed = document.getElementById("speed");
			// this.moveX = event.touches[0].pageX - this.startX;//移动距离
			drag.style.left = event.touches[0].pageX - 24 + "px";
			speed.style.left = -(this.proBar - (event.touches[0].pageX - 24)) + "px";
		},
		touchEnd: function(event) {
			event.preventDefault();
			var audio = document.getElementById("audio");
			var progressBac = document.getElementById("progressBac");
			var drag = document.getElementById("drag");
			var speed = document.getElementById("speed");
			// this.aboveX = parseInt(drag.style.left);
			this.proBar = progressBac.clientWidth;
			this.endX = drag.style.left.replace("px", "");
			audio.currentTime = (this.endX/this.proBar)*audio.duration;
			//   
			this.getSongOffset();
		},
		//播放显示
		playShow: function() {
			var self = this;
			var audio = document.getElementById("audio");
			self.dragListener();
			self.allTime = audio.duration;
			self.timeAll = self.toggleTime(self.allTime);
			self.currentTime = audio.currentTime;
			self.timeCurrent = self.toggleTime(self.currentTime);
			//播放时间每隔1s刷新
			self.timeId = setInterval(function() {
				self.currentTime = audio.currentTime;
				self.timeCurrent = self.toggleTime(self.currentTime);
			}, 1000);
		},
		//播放监听
		playListener: function() {
			var self = this;
			var audio = document.getElementById("audio");
			audio.addEventListener("loadeddata", self.playShow, false);
			audio.addEventListener("pause", function() {
				if (audio.currentTime == audio.duration) {
					audio.currentTime = 0;
				}
			}, false);
			audio.addEventListener("play", function() {
				self.progressMove();
			}, false);
			audio.addEventListener("ended", function() {
				//取消单曲播放
				console.log("end");
				self.listControl(1);
			}, false);
		},
		getSongLyric: function(lyric) {
			var lyricWrapper = document.getElementById("lyric-wrapper");
			lyricWrapper.style.top = 0;
			var items = [];
			items = lyric.split("\n");
			items.pop();
			items = items.filter(function(item) {
				return item != "" || item != undefined || item != null;
			});
			this.lyricArray = items.map(function(value) {
				//匹配歌词
				var reg = /^\[(\d+):(\d+)\.(\d+)]\s*(.*)/;
				var val = value.match(reg);
				return {
					m: val[1] ? val[1]:'', 
					s: val[2] ? val[2]:'', 
					ms: val[3] ? val[3]:'', 
					content: val[4] ? val[4]:'',
					isLinePlay: false
				};			
			});
		},
		getSongOffset: function() {
			var self = this;
			self.preLine = 0;
			var lyricWrapper = document.getElementById("lyric-wrapper");
			for (var i = 0; i < self.lyricArray.length; i++) {
				var lyric = self.lyricArray[i];
				var lyricTime = (parseInt(lyric.m * 60) + parseInt(lyric.s)) + '.' + lyric.ms;
				if (i != self.lyricArray.length - 1) {
					var lyricNext = self.lyricArray[i + 1];
					var lyricTimeNext = (parseInt(lyricNext.m * 60) + parseInt(lyricNext.s)) + '.' + lyricNext.ms;
					if (self.currentTime >= lyricTime && self.currentTime <= lyricTimeNext) {
						self.preLine = i;
						self.lyricArray[i].isLinePlay = true;
						if (i != 0) {
							self.lyricArray[i - 1].isLinePlay = false;
						}
						break;
					}
				} else {
					if (self.currentTime >= lyricTime) {
						self.preLine = i;
						self.lyricArray[i].isLinePlay = true;
						self.lyricArray[i - 1].isLinePlay = false;
						break;
					}
				}
			}
			if (self.preLine > 2) {
				lyricWrapper.style.top = (2 - self.preLine) * 40 + "px";
			}
		},
		getSongInfo: function() {
			//获取路由中歌曲的id
			this.songId = this.$router.history.current.params.id;
			var songId = this.songId;
			console.log(songId);
			this.$http.get('songs/' + songId).then(function(data) {
				// console.log(data.body);
				this.songInfo = data.body;
				this.songSrc = "src/assets/song/" + this.songInfo.md5 + ".mp3";
				this.isCollected = this.songInfo.isCollected;
				//设置背景
				var song_background = "src/assets/image/album/" + this.songInfo["album_img"];
				document.getElementById("song-back").style.background = "url(" + song_background + ") no-repeat fixed center/cover";
				document.getElementById("album-cover").style.background = "url(" + song_background + ") no-repeat center right";
				//获取歌词
				this.$http.get('lyrics/' + this.songInfo.md5).then(function(data) {
					this.getSongLyric(data.body.lyric);
				}, function(data) {
					console.log(data.msg);
				});
			}, function(data) {
				console.log(data.msg);
			});
		}
	},
	created: function() {
		this.getSongInfo();
	},
	mounted: function() {
		this.playListener();
		this.preList = this.playlist.slice(0);
	}
}
</script>
<style scoped>
	@import "../../css/common";
	@import "../../css/cover-demo";
	@import "../../css/cover-style";
	@import "../../css/songPage.css";
</style>
