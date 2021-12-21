import instance from '../../router/axios';

export const queryUserList = (params) => {
  return instance({
    url: '/getUserList',
    method: 'post',
    data: params
  })
}