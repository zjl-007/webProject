import instance from '../../router/axios';

export const queryUserInfo = (params) => {
    return instance({
        url: '/getUserInfo',
        method: 'post',
        data: params
    })
}

export const queryMenus = (params) => {
    return instance({
        url: '/getMenus',
        method: 'post',
        data: params
    })
}