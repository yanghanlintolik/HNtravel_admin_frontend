import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录页组件
import Login from '../components/Login.vue'
//后台主页组件
import Home from '../components/Home.vue'
//用户管理页面
import User from '../components/User.vue'
//热力图页面
import Heat from '../components/HeatMap.vue'
//数据页面
import Data from '../components/Data.vue'
//发布通知页
import ReleaseNotice from '../components/ReleaseNotice.vue'
//历史通知页
import Notice from '../components/Notice.vue'
//景点首页
import Introduce from '../components/Introduce.vue'
//预测数据页
import Forecast from '../components/Forecast.vue'
//票务信息页
import Ticket from '../components/Ticket.vue'
//发布广播页
import ReleaseBroadcast from '../components/ReleaseBroadcast.vue'
//路线规划页
import Router from '../components/Router.vue'


Vue.use(VueRouter)

const routes = [
	//路由重定向
	{
		path: '/',
		redirect: '/login'
	},
	// 登录页
	{
		path: '/login',
		component: Login,
	},
	//主页
	{
		path:'/home',
		component:Home,
		meta:{
		    keepAlive:true //需要被缓存的组件
		},
		redirect: '/introduce',
		children: [
			{path:'/introduce',component:Introduce},
			{path:'/user',component:User},
			{path:'/heatMap',component:Heat},
			{path:'/data',component:Data},
			{path:'/notice',component:Notice},
			{path:'/releaseNotice',component:ReleaseNotice},
			{path:'/forecast_data',component:Forecast},
			{path:'/ticket',component:Ticket},
			{path:'/releaseBroadcast',component:ReleaseBroadcast},
			{path:'/router',component:Router},
		]
	},


]

const router = new VueRouter({
	//路由模式选为历史模式
	mode: 'history',
	routes
})

//挂载路由导航守卫
//在每次路由跳转之前判断是否有token，有token的无法访问到login登陆页面，没有token只能进入login页面。
router.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		//有token进入登录页，不放行
		var f=sessionStorage.getItem("token");
		if (f) {
			next({path:'/introduce'});
		} 
		else {
			next()
		}
	}
   var ff=sessionStorage.getItem("token");
   //没有token且进入的不是登录页，转到登录页
	if (!ff && to.path != '/login') {
		   next({ path: '/login' })
	} else {
		//有token或者进入的就是登录页，放行
		next()
	}
})

export default router
