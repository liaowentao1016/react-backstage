import axios from "axios";

const request = axios.create({
  baseURL: "http://127.0.0.1:8888/api/private/v1/",
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(config => {
  //请求发出之前配置请求头信息 添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

// 响应拦截器
request.interceptors.response.use(config => {
  return config.data;
});

export default request;
