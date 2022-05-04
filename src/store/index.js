import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //state提供唯一的公共数据源，所有共享数据在state中存储
  state: {
    //存储token
    token: '',
    //当前时间
		nowTime: '',
  },
  //mutation修改$store中的数据
  mutations: {
    //存储token
    set_token(state, token) {
      state.token = token
      sessionStorage.setItem("token",token);
      // sessionStorage.token = token
      console.log("保存token成功")
    },
    //删除token
		del_token(state) {
      state.token = ''
      console.log('清除vuex中token')
			sessionStorage.removeItem('token')
		},
		//保存token的当前时间
		set_time(state,nowTime){
			state.nowTime=nowTime;
			sessionStorage.nowTime=nowTime
    },
    
		del_time(state){
			state.nowTime='';
			sessionStorage.removeItem('nowTime')
		}
  },
  //使用Action执行mutation不能执行的异步操作
  actions: {
  },
  //getter对store中的数据加工处理成新的数据，不修改原state中的内容
  modules: {
  }
})
