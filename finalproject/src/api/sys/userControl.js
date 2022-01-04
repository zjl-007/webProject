import instance from '../../router/axios';

export const queryUserList = (params) => {
  return instance({
    url: '/getUserList',
    method: 'post',
    data: params
  })
}


export const editUserInfo = (params) => {
  return instance({
    url: '/editUserInfo',
    method: 'post',
    data: params
  })
}