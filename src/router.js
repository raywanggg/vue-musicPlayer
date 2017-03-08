import Welcome from './views/Welcome.vue';
import Search from './views/search.vue';
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
