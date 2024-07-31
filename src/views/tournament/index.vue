<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 00:28:34
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-31 17:24:46
 * @FilePath: /osu!tourney-site/tourney-site/src/views/tournament/index.vue
 * @Description: 比赛列表页面组件
-->
<template>
	<a-list item-layout="vertical" size="small" :pagination="pagination" :data-source="listData" :loading="!visible"
		:split="false">
		<template #header>
			<span>比赛列表</span>
		</template>
		<template #renderItem="{ item }">
			<a-list-item key="item.title" v-if="visible">
				<template #actions>
					<div class="status-bar">
						<span v-for="{ icon, value } in item?.statusList" :key="icon">
							<font-awesome-icon :icon="icon" /> {{ value === "" ? "--" : value }}
						</span>
					</div>
				</template>
				<template #extra>
					<img width="250" height="140" alt="poster" :src="item.poster"
						style="object-fit: cover;border-radius: 10px;" />
				</template>
				<a-list-item-meta :description="item.mode + ' | ' + item.type">
					<template #title>
						<a :href="item.href">{{ item.title }}</a>
					</template>
				</a-list-item-meta>
				<a :href="item.mainSheetUrl" target="_blank" :style="item.mainSheetUrl===''?disableStyle:''">主表格/网站</a>
			</a-list-item>
		</template>
	</a-list>
</template>
<script setup name="Tournament">
import { inject, onMounted, ref } from 'vue';
let tournament = inject('tournament');
const listData = tournament.list;
const pagination = {
	onChange: page => {
		console.log(page);
	},
	pageSize: 3,
};
let visible = ref(false);
let disableStyle = ref({
	'pointer-events': 'none',
	'color':'#eaeaea'
})
// 初始化比赛列表
function initStatusList() {
	let statusWords = ["status", "players", "time"];
	listData.map((item) => {
		item.statusList = [];
		for (let e in item) {
			if (statusWords.includes(e)) {
				let param = {};
				param.value = item[e];
				param.type = e;
				switch (e) {
					case "status":
						param.icon = "fa-solid fa-square-poll-vertical";
						param.index = 0;
						break;
					case "players":
						param.icon = "fa-solid fa-users";
						param.index = 1;
						break;
					case "time":
						param.icon = "fa-solid fa-clock";
						param.index = 2;
						break;
				}
				item.statusList[param.index] = param;
			}
		}
		return item;
	});
	visible.value = true;
	console.log(listData)
}
onMounted(() => {
	initStatusList();
})
</script>
<style lang="scss" scoped>
.status-bar {
	display: flex;
	justify-content: flex-start;
	column-gap: 10px;
}

:deep(.ant-list-header) {
	padding: 0 10px;
}

:deep(.ant-list-items) {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.ant-list-item {
		padding: 10px;
		width: 50%;
	}
}
</style>