import axios from 'axios'
import { data } from 'jquery'

export default {
  // 查询
  getIeltsTable: (data) => {
    return axios.request({
      url: 'api/ielts/showIeltsTable',
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
  getTestsTable: (data) => {
    return axios.request({
      url: 'api/ielts/showTests/' + data,
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
  getPaperDeatail: (data) => {
    return axios.request({
      url: 'api/ielts/showPaper/' + data,
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
  getAvailableIdol: (data) => {
    return axios.request({
      url: 'api/ielts/showIdols/' + data,
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
  getVoice: (data) => {
    return axios.request({
      url: 'api/ielts/getVoice',
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  }
}