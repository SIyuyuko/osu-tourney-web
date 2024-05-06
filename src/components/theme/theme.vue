<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-06 11:54:10
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-06 17:52:28
 * @FilePath: /tourney-site/src/components/theme/theme.vue
 * @Description: 项目主题配置
-->
<template>
	<a-config-provider :theme="{
		token: {
			colorPrimary: '#13c2c2',// 主题色
			wireframe: true,// 是否为线框风格
			borderRadius: 10,
			fontSize: 16,
			colorLink: '#13c2c2',// 链接文本色
			colorLinkActive: '#08979c',
			colorLinkHover: '#36cfc9',
		}, algorithm: skin,
	}">
	</a-config-provider>
</template>
<script setup name="Theme">
import { theme } from 'ant-design-vue';
import { onBeforeMount, ref, watch, inject } from 'vue';
let skin = ref();
let mode = inject("themeMode");
// 切换主题样式
function toggleTheme(val) {
	skin.value = val === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm;
}
onBeforeMount(() => {
	toggleTheme(mode.value);
});
watch(mode, (val) => {
	toggleTheme(val);
}, {
	deep: true, immediate: true
})
</script>
