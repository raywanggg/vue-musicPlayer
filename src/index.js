import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import * as filters from './filters';
import routes from './router';

// var zerqu = window.ZERQU || {};
// if (process.env.NODE_ENV == 'development') {
//     window.ga = function() {};
//     Vue.config.debug = true;
// }
// Object.defineProperty(Vue.prototype, '$site', {
//     get: function() {
//         return zerqu.site || { name: 'ZERQU' }
//     }
// });

// Object.keys(filters).forEach(function(v) {
//     Vue.filter(v, filters[v]);
// });

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

new Vue({
    el: "#app",
    router,
    template: "<app></app>",
    components: {
        App
    }
});
// router.map(views);
// router.start(App, "#app");
require('./api').register(router.app);
