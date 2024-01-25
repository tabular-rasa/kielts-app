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
  getPaperDeatail:(data)=> {
    return axios.request({
      url: 'api/ielts/showPapers/' + data,
      data: data,
      method: 'post'
    }).then(res => {
      return res.data
    })
  },
}