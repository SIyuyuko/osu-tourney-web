/*
 * @Author: SIyuyuko
 * @Date: 2024-05-06 16:18:40
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-07 01:55:00
 * @FilePath: /tourney-site/src/init.js
 * @Description: 全局初始化
 */
import { ref, shallowRef } from "vue";
let themeMode = ref("light");
let collapsed = ref(false);
let current = shallowRef("home");

export default {
	install: function (App) {
		App.provide("themeMode", themeMode)
		App.provide("collapsed", collapsed)
		App.provide("current", current)
	}
}