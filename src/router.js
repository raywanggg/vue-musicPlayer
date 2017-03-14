import Welcome from './views/Welcome.vue';
import Search from './views/Search.vue';
export default [{
        path: '/welcome',
        components: {
            main: Welcome
        }
    }, {
        path: '/search',
        components: {
            search: Search
        }
    }
]
// 没有import可以直接components: require()
