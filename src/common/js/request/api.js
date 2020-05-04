import { get, post } from './http'
const getMoodList = (p) => get('/getMoodList', p)

export default {
  getMoodList,
}
