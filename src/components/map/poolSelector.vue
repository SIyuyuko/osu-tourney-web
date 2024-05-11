<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 22:20:39
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-10 17:20:39
 * @FilePath: /osu!tourney-site/tourney-site/src/components/map/poolSelector.vue
 * @Description: 图池选择器组件
-->
<template>
	<a-spin class="loading" :spinning="status.isLoading" >
		<template #tip>
			<span>Loading ...</span>
		</template>
		<a-card class="pool-body" v-if="!status.isLoading">
			<template #title>
				<span>{{ round }} Mappool</span>
			</template>
			<template #extra>
				<div class="star-btn" @click="flag = !flag">
					<font-awesome-icon v-show="flag" icon="fa-solid fa-star" />
					<font-awesome-icon v-show="!flag" icon="fa-regular fa-star" />
				</div>
				<div class="copy-btn" title="切换图池轮次">
					<a-dropdown placement="bottomRight">
						<div>
							<font-awesome-icon icon="fa-solid fa-angle-down" />
						</div>
						<template #overlay>
							<a-menu class="operate-button-menu">
								<a-menu-item @click="data = testData.pool1.data; round = 'Round 1'">Round
									1</a-menu-item>
								<a-menu-item @click="data = testData.pool2.data; round = 'Round 2'">Round
									2</a-menu-item>
								<a-menu-item @click="data = testData.pool3.data; round = 'Round 3'">Round
									3</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</div>
			</template>
			<div class="pool-content">
				<Map v-for="(item, index) in data" :key="index" :item="item"></Map>
			</div>
		</a-card>
	</a-spin>
</template>

<script setup name="PoolSelector">
import { ref, onMounted, onBeforeMount, inject } from 'vue';
// import { getModDiffStar } from '@/utils/mappool';
import { testData } from './data.js';
import Map from './map.vue'
let themeMode = inject('themeMode');
let data = ref({}); // 图池谱面数据
let status = ref({}); // 图池状态
const prop = defineProps({
	mapData: {
		type: Object,
		default: testData.pool1,
	},
});
let flag = ref(true);
let round = ref("Round 1")

onBeforeMount(() => {
	data.value = prop.mapData.data;
	// 加载图池前遍历需要计算星数的谱面，不影响原星数
	data.value.map((e) => {
		// getModDiffStar(e);
		return e;
	});
	console.log(themeMode);
});

onMounted(() => {
	data.value.map((item) => {
		return Object.assign(item, { clicked: false }); // 增加谱面点击状态属性
	});
	status.value = prop.mapData.status;
	status.value.isLoading = true;
	setTimeout(() => {
		status.value.isLoading = false;
	}, 3000)
});
</script>

<style lang="scss" scoped>
:deep(*, *::before, *::after) {
	font-family: TorusSemiBold, Puhui;
}

[data-theme='light'] {
	:deep(.ant-card-body) {
		box-shadow: 0 0 0 1px #f0f0f0;
	}
}

[data-theme='dark'] {
	:deep(.ant-card-body) {
		box-shadow: 0 0 0 1px #303030;
	}
}

.pool-body {
	display: flex;
	color: #ffffff;
	justify-content: center;
	flex-direction: column;

	:deep(.ant-card-head) {
		padding: 0 20px;

		.ant-card-extra {
			display: flex;
			column-gap: 10px;
			margin: 0 1px 0 0;
		}
	}

	:deep(.ant-card-body) {
		padding: 20px;
	}

	.pool-content {
		display: flex;
		justify-content: center;
		row-gap: 20px;
		column-gap: 20px;
		flex-wrap: wrap;

		.map-panel {

			:deep(.ant-card-body) {
				padding: 0;
				height: 60px;
				overflow: hidden;
				position: relative;

				div {
					margin: 0;
					color: #ffffff;
					background-position: center;
				}
			}

			:deep(.ant-card-actions) {
				height: 20px;
				align-items: center;
				border-top: 1px solid transparent;

				&>li>span {
					font-size: 10px;
				}
			}
		}
	}

}

.loading {
	display: flex;
	flex-direction: column;
	margin: auto;
	text-align: center;
	text-align: -webkit-center;
	row-gap: 10px;
}

*>input {
	visibility: hidden;
	display: none;
}

ul.operate-button-menu {
	* {
		font-size: 14px;
	}
}
:deep(.ant-skeleton-content){
	height: 500px;
}
</style>
