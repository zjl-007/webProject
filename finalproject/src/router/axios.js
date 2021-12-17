import axios from "axios";
import baseUrl from '../dev/baseUrl'
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    method: 'get',
    timeout: 5000,
});
instance.interceptors.request.use((config) => {
    //1.config中的信息不合规范
    //2.发送请求时，希望在界面显示加载图标
    //3.网络请求需要一些特殊的参数，例如token
    config.timeout = 10000
    config.headers.authorization = window.sessionStorage.getItem('token') || '';
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
    // if(response.data instanceof Array) {
    //     for (let i = 0; i < response.data.length; i++) {
    //         response.data[i] = JSON.parse(response.data[i])
    //     }
    // }
    if(response?.data?.code === 501) {
      window.location.href = '/login'
      window.sessionStorage.clear('token');
    }
    console.log('---------------------');
    console.log("数据返回：", response);
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default instance;