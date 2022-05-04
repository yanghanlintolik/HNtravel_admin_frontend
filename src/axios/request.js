 //封装axios
 //导入axios
 import axios from 'axios';
 //导入vuex中的store.jjs
 import store from "../store"
 //导入封装的loading组件
 import { showLoading, hideLoading } from '../loading';
 import router from '../router'
 import { Message } from 'element-ui'


 //创建一个axios实例
 const request = axios.create({
    // baseURL: 'http://8.131.61.116:8081/api/', // 生成环境url = base url + request url 
    baseURL: 'http://localhost:8081/api/', //开发环境
     // baseURL可以通过process.env.VUE_APP_BASE_API配置多环境url，也可以直接写死
     timeout: 5000 // 请求超时request timeout
 })

 //请求头中添加默认的格式
 request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
 
 // 请求拦截
 request.interceptors.request.use(
     config => {
        showLoading()//显示加载中
         if (config.method === 'post') {
             config.data = JSON.stringify(config.data)
         }
		 if (sessionStorage.getItem("token")) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = `${sessionStorage.getItem('token')}`;
		   }
         return config
     },
     error => {
         // 当请求错误时
         console.log(error) //打印错误日志
         return Promise.reject(error)
     }
 )
 
  
 // 响应拦截
request.interceptors.response.use(response => { //判断响应结果
    const status=response
        //判断token失效时
        hideLoading()//关闭加载
       if (status.data.errorID === 1 || status.data.errorID === 2 || status.data.errorID === 3 || status.data.errorID === 4) {
           //清除token
          localStorage.removeItem('token')
          window.sessionStorage.clear()
            //location.reload();
            router.replace({   //跳转页面
            path: '/login'
         })
           //跳转到登录页面
            //window.location = "/login"
            //this.$message.error(status.data.msg);
          Message.error(status.data.msg)
       }
       return response
   },error => { 
    //    if (error.response) {
    //        Message.error(error.response.data) //响应错误
    //      } else {
    //        Message.error('请求超时') //
    //      }
         Message.error('请求超时') //
       return Promise.reject(error)
   })
 
 

export default request