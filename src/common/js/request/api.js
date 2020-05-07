import { get, post } from './http'
const getMoodList = (p) => get('/getMoodList', p)
const getuptoken = (p) => get('/api/uptoken', p)

export default {
  getMoodList,
  getuptoken,
}
