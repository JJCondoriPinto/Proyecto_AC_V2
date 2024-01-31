import axios from 'axios'
import { API_URL } from './const'

const api = axios.create()

api.defaults.baseURL = API_URL

export default api