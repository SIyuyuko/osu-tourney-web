<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 00:28:34
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-02 16:26:09
 * @FilePath: /osu!tourney-site/tourney-site/src/views/tournament/index.vue
 * @Description: 比赛列表页面组件
-->
<template>
	<a-list item-layout="vertical" size="small" :pagination="pagination" :data-source="listData" :loading="!visible"
		:split="false" v-if="!showDetail">
		<template #header>
			<span>比赛列表</span>
		</template>
		<template #renderItem="{ item }">
			<a-list-item key="item.title" v-if="visible">
				<template #actions>
					<div class="status-bar" v-if="element?.width > 260">
						<span v-for="{ icon, value } in item?.statusList" :key="icon">
							<font-awesome-icon :icon="icon" /> {{ value === "" ? "--" : value }}
						</span>
					</div>
					<div class="status-bar" v-else>
						<a-tooltip v-for="{ icon, value } in item?.statusList" :key="icon" placement="bottom">
							<template #title>
								<span>{{ value === "" ? "--" : value }}</span>
							</template>
							<span>
								<font-awesome-icon :icon="icon" />
							</span>
						</a-tooltip>
					</div>
				</template>
				<template #extra>
					<img width="250" height="140" alt="poster" :src="item.poster"
						style="object-fit: cover;border-radius: 10px;" />
				</template>
				<a-list-item-meta ref="tourRef" :description="item.mode + ' | ' + item.type"
					style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					<template #title>
						<a class="tour-title" @click="showTourView(item)">{{ item.title }}</a>
					</template>
				</a-list-item-meta>
				<a :href="item.mainSheetUrl" target="_blank"
					:style="item.mainSheetUrl === '' ? disableStyle : ''">主表格/网站</a>
			</a-list-item>
		</template>
	</a-list>
	<TourView v-if="showDetail" :data="tourData" @showDetail="showDetail = false" />
</template>
<script setup name="Tournament">
import { onMounted, ref } from 'vue';
import { useResizeObserver } from '@vueuse/core'
import TourView from './tourView.vue'
let tournament = window.tournament;
const listData = tournament.list;
const pagination = {
	onChange: page => {
		console.log(page);
	},
	pageSize: 3,
};
let visible = ref(false);
let showDetail = ref(false);
const tourRef = ref(null);
const element = ref();
// 禁用样式
let disableStyle = ref({
	'pointer-events': 'none',
	'color': '#eaeaea',
});
let tourData = ref();
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
	// console.log(listData)
};
// 显示比赛详情页
function showTourView(tour) {
	tourData.value = tour;
	showDetail.value = !showDetail.value;
};
// 监听元素宽度
useResizeObserver(tourRef, (entries) => {
	const entry = entries[0];
	const { width, height } = entry.contentRect;
	element.value = { width: width, height: height };
})
onMounted(() => {
	initStatusList();
})
</script>
<style lang="scss" scoped>
.status-bar {
	// display: flex;
	// justify-content: flex-start;
	// column-gap: 10px;
	text-overflow: ellipsis;
	text-wrap: nowrap;
	white-space: nowrap;
	position: relative;
	overflow: hidden;

	span:not(:last-child) {
		margin: 0 10px 0 0;
	}
	span:hover{
		cursor: pointer;
	}
}

:deep(.ant-list-header) {
	padding: 0 10px;
}

:deep(.ant-list-items) {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.ant-list-item-main {
		overflow: hidden;
	}

	.ant-list-item {
		padding: 10px;
		width: 50%;

		.tour-title {
			font-size: 20px;
		}
	}
}

@media (max-width: 1024px) {
	:deep(.ant-list-items) {
		.ant-list-item {
			padding: 10px;
			width: 100%;
		}
	}
}
</style>