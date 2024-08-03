<!--
 * @Author: SIyuyuko
 * @Date: 2024-08-02 10:01:51
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-02 17:44:19
 * @FilePath: /osu!tourney-site/tourney-site/src/views/tournament/tourView.vue
 * @Description: 比赛详情页面组件
-->
<template>
	<a-page-header :title="data.fullTitle !== '' ? data.fullTitle : data.title"
		:sub-title="data.fullTitle !== '' ? data.title : ''" @back="backToList" style="padding: 0 0 10px 0">
		<template #tags>
			<a-tag :color="tagColor">{{ data.status }}</a-tag>
		</template>
		<template #extra>
			<a-button key="1" type="primary" :disabled="data.mainSheetUrl === ''"
				@click="openUrl(data.mainSheetUrl)">主表格/网站</a-button>
		</template>
		<a-descriptions size="small" :column="3">
			<a-descriptions-item label="比赛模式">{{ data.mode }}</a-descriptions-item>
			<a-descriptions-item label="比赛形式">{{ data.type }}</a-descriptions-item>
			<a-descriptions-item label="比赛时间">{{ data.time }}</a-descriptions-item>
		</a-descriptions>
	</a-page-header>
	<a-collapse v-if="teamData" v-model:activeKey="activeKey" :bordered="false">
		<template #expandIcon="{ isActive }">
			<caret-right-outlined :rotate="isActive ? 90 : 0" />
		</template>
		<a-collapse-panel v-for="(item, index) in teamData" :key="index" :header="item.name">
			<div class="player-list">
				<div class="player-bar" v-for="(player, index) in item.player" :key="index">
					<a-avatar v-if="player?.avatar" :src="player?.avatar" :size="32"></a-avatar>
					<a-avatar v-else>
						<font-awesome-icon icon="fa-solid fa-user-large-slash" />
					</a-avatar>
					<span>{{ player?.username ? player?.username : "Loading..." }}</span>
					<div class="operate-button-group">
						<a-button size="small" type="primary"
							@click="openUrl('https://osu.ppy.sh/users/' + player?.uid)">
							<font-awesome-icon icon="fa-solid fa-circle-info" />
							玩家主页
						</a-button>
						<a-button size="small" :disabled="player?.username === '玩家不存在'" @click="copyCommand(player)"
							style="width: 145px;">
							<div class="no-copy" v-show="!player.getCommand">
								<font-awesome-icon icon="fa-solid fa-at" />
								<span>邀请玩家加入房间</span>
							</div>
							<div class="copy" v-show="player.getCommand">
								<span>已复制指令</span>
							</div>
						</a-button>
					</div>
				</div>
			</div>
		</a-collapse-panel>
	</a-collapse>
</template>
<script setup name="TourView">
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { defineProps, onMounted, ref, onUnmounted } from 'vue';
import { getUserInfo } from '@/api/data_api.js';
const emit = defineEmits(['showDetail']);
const prop = defineProps({
	data: {
		type: Object,
	}
});
let tagColor = ref("");// 状态标签颜色
const activeKey = ref([]);
let teamData = ref();
// 返回上一页
function backToList() {
	emit('showDetail');
}
// 打开网站
function openUrl(url) {
	if (url !== "" && url) {
		window.open(url, "_blank");
	}
}
// 复制比赛指令
function copyCommand(item) {
	let input = document.createElement('input');
	let mpPrefix = '!mp invite';
	input.value = `${mpPrefix} ${item?.username}`;
	document.body.appendChild(input);
	input.select();
	document.execCommand('Copy');
	input.remove();
	item.getCommand = true;
	setTimeout(() => {
		item.getCommand = false;
	}, 1000);
}
// 初始化页面
function initView() {
	if (prop.data) {
		switch (prop.data.status) {
			case "进行中":
				tagColor.value = "cyan";
				break;
			case "已结束":
				tagColor.value = "purple";
				break;
		};
		initUser();
	}
}
// 获取玩家信息
function initUser() {
	if (prop.data.team) {
		teamData.value = prop.data.team;
		teamData.value.map((item) => {
			for (let e in item.player) {
				if (typeof item.player[e] === 'number') {
					let obj = {};
					getUserInfo(item.player[e]).then((res) => {
						if (res) {
							obj = {
								uid: item.player[e],
								username: res?.data?.username,
								avatar: res?.data?.avatar_url,
							};
							item.player[e] = obj;
						}
					}).catch(() => {
						obj = {
							uid: item.player[e],
							username: "玩家不存在",
						};
						item.player[e] = obj;
					});
				}
			}
		});
	}
}
onMounted(() => {
	initView();
});
onUnmounted(() => {
	// teamData.value = null;
})
</script>
<style lang="scss" scoped>
*>input {
	visibility: hidden;
	display: none;
}

.player-list {
	display: flex;
	row-gap: 10px;
	flex-direction: column;

	&>div {
		span+span {
			margin: 0 0 0 10px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.player-bar {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;

		.operate-button-group {
			margin: 0 0 0 auto;
			display: flex;
			flex-wrap: nowrap;
			column-gap: 10px;

			&>:deep(.ant-btn) {
				font-size: 14px;
				align-items: center;
				display: flex;
				column-gap: 2px;
				flex-wrap: nowrap;

				.copy {
					text-align: center;
					width: 100%;
				}
			}
		}
	}
}
</style>