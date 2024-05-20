import axios from "axios";
import { customBaseUrl } from "../api/environment";
const instance = axios.create({
	baseURL: "",//接口统一域名
	timeout: 5000,//设置超时
	
})
export default instance