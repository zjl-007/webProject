import instance from '../../router/axios';
let urlList = [
  '/startCapture', 
  '/stopCapture', 
  '/getCapture', 
  '/getDevices', 
  '/toSaveData'];
let requestObj = {}; 
urlList.forEach(url => {
  requestObj[url] = function(params) {
    return instance({
      url,
      method: 'post',
      data: params,
    })
  }
  // requestObj.push()
})
const startCapture = requestObj['/startCapture'];
const stopCapture = requestObj['/stopCapture'];
const getCapture = requestObj['/getCapture'];
const getDevices = requestObj['/getDevices'];
const toSaveData = requestObj['/toSaveData'];
export {
  startCapture,
  stopCapture,
  getCapture,
  getDevices,
  toSaveData
}


















// export const startCapture = () => {
//   return instance({
//     url: '/startCapture',
//     method: 'post',
//   })
// }

// export const stopCapture = () => {
//   return instance({
//     url: '/stopCapture',
//     method: 'post',
//   })
// }

// export const getCapture = () => {
//   return instance({
//     url: '/getCapture',
//     method: 'post',
//   })
// }

// export const getDevices = () => {
//   return instance({
//     url: '/getDevices',
//     method: 'post',
//   })
// }

// export const toSaveData = (params) => {
//   return instance({
//     url: '/toSaveData',
//     method: 'post',
//     data: params
//   })
// }
