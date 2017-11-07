import * as axios from 'axios'
// import Cookie from 'cookie'

// const inBrowser = typeof window !== 'undefined'

// const cookieStr = inBrowser ? document.cookie : ''
// const cookies = Cookie.parse(cookieStr || '') || {}
// const token = cookies.token

let options = {
  baseURL: 'http://tokobosapi.dev/api/v1/',
  headers: {
    'Content-Type': 'application/json'
    // 'Authorization': 'Bearer ' + token
  }
}

export default axios.create(options)
