import { Router } from 'express'
import axios from '../../plugins/axios'

const router = Router()

router.post('/auth', (req, res, next) => {
  // console.log(req.body)
  axios.post('auth', {
    username: req.body.username,
    password: req.body.password
  }).then((result) => {
    req.session.user = result.data.data
    req.session.token = result.data.token
    return res.json(result.data)
    // console.log(result)
  }).catch((e) => {
    // console.log(e.response)
    return res.status(e.response.status).json({ message: e.response.statusText })
  })
  // return res.json('ok')
})

router.post('/logout', (req, res, next) => {
  return res.json('ok')
})

export default router