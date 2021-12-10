import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3999',
    withCredentials: false,
    // baseURL: 'http://152.136.158.210:7878/api/m5',
    method: 'get',
    timeout: 5000,
});
// instance.interceptors.request.use((config) => {
//     //1.config中的信息不合规范
//     //2.发送请求时，希望在界面显示加载图标
//     //3.网络请求需要一些特殊的参数，例如token
//     config.timeout = 10000
//     return config
//   }, (err) => {
//     console.log(err);
//   });
//   instance.interceptors.response.use((response) => {
//     return response.data
//   }, (err) => {
//     console.log(err);
//   })
export default instance;