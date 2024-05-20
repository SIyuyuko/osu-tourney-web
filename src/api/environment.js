/**
 * 判断环境返回响应的接口前缀
 */

export const URL_PREFIX = {
  // 开发环境接口代理 0:测试；1:生产
  DEV: ['/dev2test', '/dev2production'][0],
  // 测试环境接口基础url
  TEST: '/specific-test',
  // 生产环境基础基础url
  PROD: '/',
};

export const isDevelopEnv = process.env.NODE_ENV === 'development'; // 是否为开发环境
export const isTestEnv = window.location.hostname === 'api.test.cn'; // 是否为测试环境

/* 接口地址 */
export const customBaseUrl = isDevelopEnv ? 'https://sp.365246692.xyz' : '';
