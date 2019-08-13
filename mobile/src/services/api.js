import axios from 'axios'
import { Platform } from 'react-native'

var URL = ''

Platform.select({
    ios: URL = 'http://localhost:3333',
    android: URL = 'http://10.0.2.2:3333'
})

const api = axios.create({
    baseURL: URL
})

export default api