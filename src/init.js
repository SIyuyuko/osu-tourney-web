/*
 * @Author: SIyuyuko
 * @Date: 2024-05-06 16:18:40
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-29 17:10:54
 * @FilePath: /osu!tourney-site/tourney-site/src/init.js
 * @Description: 全局初始化
 */
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ref, shallowRef } from 'vue';
import user from '../public/config/user.js';
import banner from '../public/config/banner.js';
import mappool from '../public/config/mappool.js';
import tournament from '../public/config/tournament.js';
let themeMode = ref('light');
let collapsed = ref(false);
let current = shallowRef('home');

export default {
  install: function (App) {
    App.provide('themeMode', themeMode);
    App.provide('collapsed', collapsed);
    App.provide('current', current);
    App.provide('user', user);
    App.provide('banner', banner);
    App.provide('mappool', mappool);
    App.provide('tournament', tournament);
    dayjs.locale('zh-cn');
  },
};
