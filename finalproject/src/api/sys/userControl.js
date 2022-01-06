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


export const delUser = (params) => {
  return instance({
    url: '/delUser',
    method: 'post',
    data: params
  })
}

export const addUser = (params) => {
  return instance({
    url: '/addUser',
    method: 'post',
    data: params
  })
}