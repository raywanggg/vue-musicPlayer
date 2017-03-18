import Home from './views/Home.vue';
import Recommend from './views/Recommend.vue';
import Rank from './views/Rank.vue';
import Person from './views/Person.vue';
export default [{
        path: '/home',
        components: {
            home: Home
        }
    }, {
        path: '/recommend',
        components: {
            home: Home,
            viewall: Recommend
            // recommend: Recommend
        }
    }, {
        path: '/rank',
        components: {
            home: Home,
            viewall: Rank
        }
    }, {
        path: '/person',
        components: {
            home: Home,
            viewall: Person
        }
    }
]
// 没有import可以直接components: require()
