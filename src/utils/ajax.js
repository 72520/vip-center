import 'whatwg-fetch'
import qs from 'querystring'
import store from 'vx/store'
// import { auth } from 'vx/getters'
import { SET_PROGRESS, ADD_TOAST, DELETE_TOAST } from 'vx/types'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function setProgress (progress) {
  store.dispatch(SET_PROGRESS, progress)
}

function addToast (toast) {
  toast._id = Date.now()

  store.dispatch(ADD_TOAST, toast)
  setTimeout(() => {
    store.dispatch(DELETE_TOAST, toast)
  }, 3000)
}

function mutate (url, { headers, body, query, ...options }) {
  headers = { ...defaultHeaders, ...headers }
  options.headers = headers
  alert('sb')
  if (window.Bridge) {
    var uc = window.Bridge.require('sdp.uc')
    // var ret = uc.getMACContent({ 'url':  url, 'method': options.method })
    var ret = uc.getMACContent({ 'url': location.origin + '/' + url, 'method': options.method })
    alert(ret.result)
    if (ret.result === true) {
      alert(ret.returnMessage)
      headers['Authorization'] = ret.returnMessage.replace(/\\"/g, '"')
      alert(headers['Authorization'])
    }
  }

  // const bearer = auth(store.state)
  // if (bearer) {
  //   headers['Authorization'] = 'Bearer ' + bearer.token
  // }

  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    options.body = body
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += (url.indexOf('?') !== -1) ? '&' : '?'
    url += query
  }
  // alert(url)
  return [url, options]
}

const ajax = (url, options = {}) => {
  setProgress(99)
  return fetch(...mutate(url, options))
  .then(res => {
    // alert(res.status)
    if (res.status >= 200 && res.status < 400) {
      return res
    } else {
      throw res
    }
  })
  .then(res => {
    setProgress(0)
    return res.json()
  })
  .catch(err => {
    setProgress(0)
    if (!err.json) {
      addToast({
        code: '500',
        message: 'Server Error'
      })
    } else {
      err.json().then(addToast)
    }
    throw err
  })
}

export default ajax

export const GET = (url, options = {}) => {
  options.method = 'GET'
  return ajax(url, options)
}

export const POST = (url, options = {}) => {
  options.method = 'POST'
  return ajax(url, options)
}

export const PUT = (url, options = {}) => {
  options.method = 'PUT'
  return ajax(url, options)
}

export const PATCH = (url, options = {}) => {
  options.method = 'PATCH'
  return ajax(url, options)
}

export const DELETE = (url, options = {}) => {
  options.method = 'DELETE'
  return ajax(url, options)
}

export const PAGINATE_QUERY = {
  $count: true,
  $offset: 0,
  $limit: 2
}
