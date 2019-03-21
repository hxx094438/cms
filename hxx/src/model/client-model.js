import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  baseURL: typeof window === 'object' ? '/api' : 'http://127.0.0.1:3002/api'
})

const handleRequest = (request) => {
  // console.log('request',request)
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const {data , status} = resp
      // console.log('resp',resp)
      // console.log('data',data)
      if (status === 200) {
        console.log('resolve',data)
        resolve(data)
      } else {
        return reject(createError(data.code,data.message))
      }
    }).catch(err => {
      console.log('handleRequest Error---------------', err)
      // if (resp.status === 401) {
      //   reject(createError(401, 'need auth'))
      // }
    })
  })
}

export default {
  // getAllTodos () {
  //   return handleRequest(request.get('/api/todos'))
  // },
  // login (username, password) {
  //   return handleRequest(request.post('/user/login', { username, password }))
  // },
  login(payload) {
    return handleRequest(request.post('/admin/login', payload))
  },











  getAllArticles(payload) {
    return handleRequest(request.get('/articles/all', {params: {payload}}))
  },

  getArticle(aid) {
    return handleRequest(request.get(`/articles/${aid}`))
  },


  saveArticlePatch(payload) {
    return handleRequest(request.patch(`/article/${payload.aid}`, payload.article))
  },

  saveArticlePost(article) {
    return handleRequest(request.post(`/article/`, article))
  }


}
