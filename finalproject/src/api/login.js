import instance from '../router/axios.js';




export const login = (params) => {
    return instance({
        url: '/login',
        method: 'post',
        data: params
    })
}