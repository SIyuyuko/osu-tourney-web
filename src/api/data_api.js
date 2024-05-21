import axios from '../http/axios.js';
/** 登录获取授权链接 */
export const getOauthUrl = (params) => {
  return axios({
    method: 'get',
    url: '/api/public/getOauthUrl',
    params,
  });
};
/** token登陆 */
export const login = (params) => {
  return axios({
    method: 'get',
    url: `/api/user/login?code=${params}`,
  });
};
// 获取谱面bg
export const getBeatmapBg = (params) => {
  return axios({
    method: 'get',
    url: `/api/background/${params}`,
  });
};
// 生成比赛图池
export const getMappool = (params) => {
  return axios({
    method: 'post',
    url: `/pool?name=${params.name}`,
    data: params.data,
    responseType: 'blob',
  });
};
// 投骰子
export const getDice = (params) => {
  return axios({
    method: 'get',
    url: `/dice`,
    params,
  });
};
// 玩家登录
export const getLogin = (params) => {
  return axios({
    method: 'get',
    url: `/login`,
    params,
  });
};
// 获取玩家信息
export const getUserInfo = (params) => {
  return axios({
    method: 'get',
    url: `/info/json`,
    params,
  });
};
