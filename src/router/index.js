import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import goods from '../components/goods'
import seller from '../components/seller'
import ratings from '../components/ratings'

Vue.use(Router);
Vue.use(vueResource);

export default new Router({
	linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
     	component:goods
    },
    {
    	path: '/ratings',
    	component:ratings
    },
    {
    	path: '/seller',
    	component:seller
    }
  ]
})
