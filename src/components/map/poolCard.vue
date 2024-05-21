<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 16:34:48
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-21 14:20:27
 * @FilePath: /tourney-site/src/components/map/poolCard.vue
 * @Description: 图池列表卡片组件
-->
<template>
	<a-card class="pool-card" v-if="item.title !== '新建图池'" @click="changeCurPage('mappool',item)" hoverable>
		{{ item.title }}
	</a-card>
	<a-card class="add-card" v-else hoverable @click="changeCurPage('add')">
		<div>
			<font-awesome-icon icon="fa-solid fa-folder-plus" />
			<span class="add-title">新建图池</span>
		</div>
	</a-card>
</template>
<script setup name="poolCard">
import { inject, onMounted } from 'vue';
const changeCurPage = inject("changeCurPage");
defineProps({
	item: {
		type: Object,
	},
});
onMounted(() => {
})
</script>
<style lang="scss" scoped>
.add-card{
	.add-title{
		margin-left: 10px;
	}
}
</style>