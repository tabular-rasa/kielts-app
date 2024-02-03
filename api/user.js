import axios from 'axios'

export default {
  // 登录
  login: (data) => {
    return axios.request({
      url: 'api/user/login/',
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
  //注册
  register: (data) => {
    return axios.request({
      url: 'api/user/register/',
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
  //登陆验证
  verifyCode: (data) => {
    return axios.request({
      url: 'api/user/verifyCode/',
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  }
}