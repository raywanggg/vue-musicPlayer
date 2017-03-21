var fs = require('co-fs');
// var parse = require('co-body');
var logger = require('koa-logger');
var router = require('koa-router')();
var staticServe = require('koa-static');
// var session = require('koa-session');
var Koa = require('koa');

var app = new Koa();

// app.keys = ['koajs'];

app.use(logger());
// app.use(session(app));

app.use(staticServe('./src/assets/'));

router
    .get('/api/v1/songs/recommend', function* (next) {
        let size = parseInt(this.request.query.size) || 8;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = new Set();
        while(result.size < size) {
            let rand = Math.floor(Math.random(0, 1) * songs.length);
            result.add(songs[rand]);
        }
        this.body = Array.from(result);
        // yield next;
    })
    .get('/api/v1/songs/rank', function* (next) {
        let size = parseInt(this.request.query.size) || 8;
        let page = parseInt(this.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8')).sort((a, b) => b.liked - a.liked);
        let rstSongs = songs.slice(page * size - size, page * size);
        let result = {
            data: rstSongs,
            totalNum: songs.length,
            page: page,
            size: rstSongs.length
        };
        this.body = result;
        // yield next;
    })
    .get('/api/v1/songs/mine', function* (next) {
        let size = parseInt(this.request.query.size) || 8;
        let page = parseInt(this.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let rstSongs = songs.slice(page * size - size, page * size);
        let result = {
            data: rstSongs,
            totalNum: songs.length,
            page: page,
            size: rstSongs.length
        };
        this.body = result;
        // yield next;
    })
    .get('/api/v1/songs/search', function* (next) {
        let key = this.request.query.key;
        if(!key){
            this.body = {data: []};
            return;
        }
        let keyReg = new RegExp(key);
        let size = parseInt(this.request.query.size) || 8;
        let page = parseInt(this.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        songs = songs.filter(song => keyReg.test('' + song.name + song.author));
        let rstSongs = songs.slice(page * size - size, page * size);
        let result = {
            data: rstSongs,
            totalNum: songs.length,
            page: page,
            size: rstSongs.length
        };
        this.body = result;
        // yield next;
    })
    .get('/api/v1/songs/:id', function* (next) {
        let songsList = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = songsList.find((song) => this.params.id == song.id);
        if(!result){
            this.status = 404;
            this.body = '歌曲不存在！';
            return;
        }
        this.body = result;
        // yield next;
    });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80, () => {
    console.log('listening on port 80');
});
