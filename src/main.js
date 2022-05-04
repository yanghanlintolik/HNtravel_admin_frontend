import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import './assets/css/details.less'
// 导入axios包
import './axios/request.js'
// var axios = require('axios')
//引入echarts主题包
import './assets/echarts_theme/westeros.js'

// 配置请求跟路径如：http://127.0.0.1:8888/api/private/v1/
// axios.defaults.baseURL = 'http://localhost:8081/api/'

// axios包挂载到vue的原型对象上
Vue.prototype.$axios = request
Vue.config.productionTip = false

// 导入echarts包
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 导入富文本组件
// import Editor from './components/Editor';
//导入icomoon字体图标
import './assets/css/style.css'

//使用Vuex
import store from './store'
import request from './axios/request.js'

//注册组件
// Vue.component("Editor", Editor);


Vue.config.productionTip = false

new Vue({
	router,
	//将store对象挂载到vue实例中
    store,
    render: h => h(App)
}).$mount('#app')
