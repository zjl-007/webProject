import axios from "axios";
import Vue from "vue"
// import baseUrl from '../dev/baseUrl'
const instance = axios.create({
  // baseUrl: baseUrl,
  withCredentials: false,
  method: 'post',
  timeout: 5000,
});
// console.log(process)
instance.interceptors.request.use((config) => {
  //1.config中的信息不合规范
  //2.发送请求时，希望在界面显示加载图标
  //3.网络请求需要一些特殊的参数，例如token
  config.timeout = 50000
  config.headers.authorization = window.sessionStorage.getItem('token') || '';
  config.headers.idusers = window.sessionStorage.getItem('id') || '';
  console.log("请求url：", config.url, ";请求数据：", config.data);
  //console.log(window.sessionStorage.getItem('token'));
  return config
}, (err) => {
  console.log(err);
}); 
instance.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  console.log(err);
})
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response?.code === 501) {
    // window.location.href = '/login'
    window.vm.$router.push('/login')
    window.vm.$message({
      type: 'warning',
      message: response.message
    })
    window.sessionStorage.clear('token');
    return response;
  }
  console.log("数据返回：", response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default instance;