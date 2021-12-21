import instance from '../../router/axios';

export const startCapture = () => {
  return instance({
    url: '/startCapture',
    method: 'post',
  })
}
export const stopCapture = () => {
  return instance({
    url: '/stopCapture',
    method: 'post',
  })
}
export const getCapture = () => {
  return instance({
    url: '/getCapture',
    method: 'post',
  })
}


export const getDevices = () => {
  return instance({
    url: '/getDevices',
    method: 'post',
  })
}