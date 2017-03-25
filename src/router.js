import Home from './views/Home.vue';
import Recommend from './views/Recommend.vue';
import Rank from './views/Rank.vue';
import Person from './views/Person.vue';
export default [{
        path: '/home',
        components: {
            home: Home
        },
        children: [{
            path: 'recommend',
            components: {
                viewall: Recommend
            }
        }, {
            path: 'rank',
            components: {
                viewall: Rank
            }
        }, {
            path: 'person',
            components: {
                viewall: Person
            }
        }]
    }
]
// 没有import可以直接components: require()
