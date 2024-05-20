<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 16:15:55
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-14 18:11:49
 * @FilePath: /tourney-site/src/views/mappool/poolList.vue
 * @Description: 图池列表组件
-->
<template>
	<div class="list-page">
		<a-list :grid="{ gutter: 16, column: 4 }" :data-source="data">
			<template #renderItem="{ item }">
				<a-list-item>
					<PoolCard :item="item" />
				</a-list-item>
			</template>
		</a-list>
	</div>
</template>
<script setup name="poolList">
import PoolCard from '../../components/map/poolCard.vue'
const data = [
	{
		title: '新建图池',
	},
	{
		title: 'Title 2',
	},
	{
		title: 'Title 3',
	},
	{
		title: 'Title 4',
	}, {
		title: 'Title 1',
	},
	{
		title: 'Title 2',
	}
];

</script>
<style lang="scss" scoped>
:deep(.ant-list .ant-list-item) {
	padding: 0;
}
.list-page{
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}
</style>