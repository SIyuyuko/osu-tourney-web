<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 01:54:03
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-21 14:56:44
 * @FilePath: /tourney-site/src/views/mappool/index.vue
 * @Description: 图池页面组件
-->
<template>
	<div class="page">
		<div class="nav">
			<a-breadcrumb>
				<a-breadcrumb-item @click="changeCurPage('list')">
					<a v-if="curPage !== 'list'">图池列表</a>
					<span v-else>图池列表</span>
				</a-breadcrumb-item>
				<a-breadcrumb-item v-if="curPage === 'mappool'">{{ poolTitle }}</a-breadcrumb-item>
				<a-breadcrumb-item v-if="curPage === 'add'">添加图池</a-breadcrumb-item>
			</a-breadcrumb>
		</div>
		<div class="view">
			<!-- <keep-alive> -->
				<component :is="current"></component>
			<!-- </keep-alive> -->
		</div>
	</div>
</template>
<script setup name="Mappool">
import { ref, shallowRef, provide } from 'vue';
import poolList from './poolList.vue';
import poolView from './poolView.vue';
import addPool from './addPool.vue';
let curPage = ref("list");
let current = shallowRef(poolList);
let menu = ref([
	{ name: 'list', component: shallowRef(poolList) },
	{ name: 'mappool', component: shallowRef(poolView) },
	{ name: 'add', component: shallowRef(addPool) },
]);
let poolTitle = ref("Mappool");
provide("changeCurPage", changeCurPage);
// 切换页面
function changeCurPage(page,data) {
	curPage.value = page;
	for (let item of menu.value) {
		if (item.name === page) {
			current.value = item.component;
			if (data) {
				poolTitle.value = data.title;
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.page {
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}
</style>