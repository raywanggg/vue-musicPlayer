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

// app.use(staticServe('./static/'));

router
    .get('/api/v1/songs', function* (next) {
        var x = yield fs.readFile(`./database/songs_list.js`, 'utf8');
        console.log(x);
        this.body = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        yield next;
    })
    .get('/api/v1/songs/:id', function* (next) {
        console.log(this.params.id);
        let songsList = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = songsList.find((song) => this.params.id == song.id);
        if(!result){
            this.status = 404;
            this.body = '歌曲不存在！';
            return;
        }
        this.body = result;
        yield next;
    });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80, () => {
    console.log('listening on port 80');
});
