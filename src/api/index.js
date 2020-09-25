import base from './base'; // 导入接口域名列表
import axios from '../request/http'
const api = {
    login(params){
        return axios.post(`${base}/user-service/login`,params)
    },
    get(params){
        return axios.get(`https://www.baidu.com/`,params)
    }
}
export default api;