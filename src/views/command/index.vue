<!--
 * @Author: SIyuyuko
 * @Date: 2024-08-02 17:55:00
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-08 17:18:57
 * @FilePath: /osu!tourney-site/tourney-site/src/views/command/index.vue
 * @Description: 指令列表组件
-->
<template>
	<div class="page no-scroll">
		<div class="view">
			<div class="command-list" v-if="commandCopy">
				<div class="nav">
					<span>指令列表</span>
					<a :href="wikiUrl" target="_blank" title="点击查看官网wiki">wiki</a>
				</div>
				<p class="command" v-for="(item, index) in commandList" :key="index">
					<span>{{ index + 1 }}. </span><span>{{ item.name }}</span>
					<a-typography-paragraph v-model:content="commandCopy[index].value" :editable="{ tooltip: false }"
						:copyable="{ tooltip: false }" keyboard>
						<template #editableIcon>
							<a-button class="operate-btn" type="default" size="small">编辑
								<template #icon>
									<span><font-awesome-icon icon="fa-solid fa-pencil" /></span>
								</template>
							</a-button>
						</template>
						<template #copyableIcon="{ copied }">
							<a-button class="operate-btn" type="primary" size="small">复制
								<template #icon>
									<span v-if="!copied" key="copy-icon">
										<font-awesome-icon icon="fa-regular fa-copy" />
									</span>
									<span v-else key="copied-icon">
										<font-awesome-icon icon="fa-solid fa-check" />
									</span>
								</template>
							</a-button>
						</template>
					</a-typography-paragraph>
				</p>
			</div>
			<a-divider type="vertical" style="height: auto"></a-divider>
			<a-collapse class="referee-list" v-model:activeKey="activeKey" :bordered="false" ghost>
				<template #expandIcon="{ isActive }">
					<caret-right-outlined :rotate="isActive ? 90 : 0" />
				</template>
				<a-collapse-panel key="1" header="裁判表">
					<div class="config-panel">
						<div class="prefix-bar">
							<a-input v-model:value="configList.prefix" allow-clear placeholder="请输入比赛缩写" style="width: 70%">
								<template #prefix>
									<font-awesome-icon icon="fa-solid fa-chess" />
								</template>
							</a-input>
							<a-input v-model:value="configList.bo" type="number" allow-clear style="width: 30%">
								<template #prefix>
									<span>Best Of</span>
								</template>
							</a-input>
						</div>
						<a-input v-model:value="configList.redTeam" allow-clear placeholder="请输入红队队名">
							<template #prefix>
								<font-awesome-icon icon="fa-solid fa-users-line" style="color: #d9363e" />
							</template>
						</a-input>
						<a-input v-model:value="configList.blueTeam" allow-clear placeholder="请输入蓝队队名">
							<template #prefix>
								<font-awesome-icon icon="fa-solid fa-users-line" style="color: #0958d9" />
							</template>
						</a-input>
						<div class="mode-bar">
							<a-select v-model:value="configList.teamMode" :options="teamOptions"
								style="width: calc(50% - 5px)" allowClear placeholder="请选择组队模式">
								<template #suffixIcon>
									<font-awesome-icon icon="fa-solid fa-user-group" />
								</template>
							</a-select>
							<a-select v-model:value="configList.scoreMode" :options="scoreOptions"
								style="width: calc(50% - 5px)" allowClear placeholder="请选择计分模式">
								<template #suffixIcon>
									<font-awesome-icon icon="fa-solid fa-ranking-star" />
								</template>
							</a-select>
						</div>
						<div class="time-bar">
							<div>
								<span>倒计时时间</span>
								<a-radio-group v-model:value="configList.timer">
									<a-radio :value="60">60秒</a-radio>
									<a-radio :value="90">90秒</a-radio>
									<a-radio :value="120">120秒</a-radio>
								</a-radio-group>
							</div>
							<div>
								<span>比赛开始时间</span>
								<a-radio-group v-model:value="configList.startTime">
									<a-radio :value="10">10秒</a-radio>
									<a-radio :value="15">15秒</a-radio>
									<a-radio :value="30">30秒</a-radio>
								</a-radio-group>
							</div>
						</div>
						<div class="pick-bar" v-if="configList.redTeam && configList.blueTeam">
							<div>
								<span>下一个禁图队伍</span>
								<a-radio-group v-model:value="configList.banTeam">
									<a-radio :value="configList.redTeam">{{ configList.redTeam }}</a-radio>
									<a-radio :value="configList.blueTeam">{{ configList.blueTeam }}</a-radio>
								</a-radio-group>
							</div>
							<div>
								<span>下一个选图队伍</span>
								<a-radio-group v-model:value="configList.pickTeam">
									<a-radio :value="configList.redTeam">{{ configList.redTeam }}</a-radio>
									<a-radio :value="configList.blueTeam">{{ configList.blueTeam }}</a-radio>
								</a-radio-group>
							</div>
						</div>
					</div>
				</a-collapse-panel>
				<a-collapse-panel key="2" header="计分板">
					<div class="score-panel">
						<div class="vs-header">
							<div>
								<span :title="configList.redTeam"><font-awesome-icon
										v-if="configList.redTeamScore !== configList.maxWinRound || !configList.redTeamScore"
										icon="fa-solid fa-users-line" style="color: #d9363e" />
									<font-awesome-icon v-else icon="fa-solid fa-crown" style="color: #ffd43b" />
									{{ configList.redTeam }}
								</span>
								<a-input-number v-model:value="configList.redTeamScore" :min="0"
									:max="configList.maxWinRound ? configList.maxWinRound : 100" :bordered="false" />
							</div>
							<div class="vs">
								<span>VS</span>
								<span>:</span>
							</div>
							<div>
								<span :title="configList.blueTeam"><font-awesome-icon
										v-if="configList.blueTeamScore !== configList.maxWinRound || !configList.blueTeamScore"
										icon="fa-solid fa-users-line" style="color: #0958d9" />
									<font-awesome-icon v-else icon="fa-solid fa-crown" style="color: #ffd43b" />
									{{ configList.blueTeam }}
								</span>
								<a-input-number v-model:value="configList.blueTeamScore" :min="0"
									:max="configList.maxWinRound ? configList.maxWinRound : 100" :bordered="false" />
							</div>
						</div>
						<div class="narrator-bar">
							<span>报幕配置</span>
							<a-checkbox-group v-model:value="configList.narratorSetting" :options="narratorOptions" />
						</div>
						<a-typography-text v-if="configList.narratorSetting.length > 0" copyable
							style="white-space: pre-line;display: flex;align-items: center;" code>
							{{ configList.narrator }}
							<template #copyableIcon="{ copied }">
								<span v-if="!copied" key="copy-icon">
									<font-awesome-icon icon="fa-regular fa-copy" />
								</span>
								<span v-else key="copied-icon">
									<font-awesome-icon icon="fa-solid fa-check" />
								</span>
							</template>
							<template #copyableTooltip="{ copied }">
								<span v-if="!copied" key="copy-tooltip">复制</span>
								<span v-else key="copied-tooltip">复制成功</span>
							</template>
						</a-typography-text>
					</div>
				</a-collapse-panel>
				<a-collapse-panel key="3" header="图池">
					<PoolSelector v-if="configList.mappool" :isReferee="true" @update="getMappool" />
					<a-empty v-else description="暂无图池" :image="Empty.PRESENTED_IMAGE_SIMPLE" style="width: 100%;" />
				</a-collapse-panel>
			</a-collapse>
		</div>
	</div>
</template>
<script setup name="Command">
import { Empty } from 'ant-design-vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { ref, onMounted, computed, watch } from 'vue';
import PoolSelector from "@/components/map/poolSelector.vue";
let wikiUrl = 'https://osu.ppy.sh/wiki/zh/osu%21_tournament_client/osu%21tourney/Tournament_management_commands'; // 比赛指令wiki链接
let commandCopy = ref();
let defaultCommand = null;
let commandList = computed({
	get() {
		return window.command.list;
	},
});
const activeKey = ref([1, 2]);
// 配置列表
let configList = ref({
	prefix: '', //比赛缩写
	redTeam: '', //红队队名
	blueTeam: '', //蓝队队名
	teamMode: null, //组队模式
	scoreMode: null, //计分模式
	teamList: [], //队伍列表
	redTeamScore: 0, //红队得分
	blueTeamScore: 0, //蓝队得分
	bo: null, // 对阵场数
	maxWinRound: null, // 比赛胜利场数
	banTeam: '', // ban图队伍
	pickTeam: '', // 选图队伍
	timer: '',// 倒计时时间
	startTime: '',// 比赛开始时间
	narratorSetting: [],// 报幕配置
	narrator: "",// 报幕文字
	winner: "",// 获胜方
	mappool: [],// 图池
});
// 组队模式列表
let teamOptions = ref([
	{ label: 'Head To Head', value: '0' },
	{ label: 'Tag Coop', value: '1' },
	{ label: 'Team Vs', value: '2' },
	{ label: 'Tag Team Vs', value: '3' },
]);
// 计分模式列表
let scoreOptions = ref([
	{ label: 'Score', value: '0' },
	{ label: 'Accuracy', value: '1' },
	{ label: 'Combo', value: '2' },
	{ label: 'Score V2', value: '3' },
]);
// 报幕列表
let narratorOptions = ref([
	{ label: "比分", value: "score" },
	{ label: "选图", value: "pick" },
	{ label: "图池余量", value: "mappool" },
	{ label: "获胜方", value: "winner" },
]);
let scoreWords = "";
let pickWords = "";
let poolWords = "";
let winnerWords = "";
// 获取图池列表
function getMappool(value) {
	if (value) {
		configList.value.mappool = value.map.filter((item) => item.checkStatus === false || !item.checkStatus).map((item) => {
			item = item.mod + item.index;
			return item;
		});
	}
}
onMounted(() => {
	commandCopy.value = window.command.list;
	defaultCommand = window.command.list;
});
// 监听配置项更新指令
watch(
	configList,
	(val) => {
		// console.log(val, window.command.list);
		for (let e in val) {
			let index;
			switch (e) {
				case 'prefix':
					index = commandCopy.value.findIndex((value) => value.cmd === '!mp make');
					if (val.prefix && val.redTeam && val.blueTeam) {
						if (val.redTeam && val.blueTeam) {
							commandCopy.value[index].value = `${defaultCommand[index].cmd} ${val.prefix}:(${val.redTeam})vs(${val.blueTeam})`;
						}
					} else {
						commandCopy.value[index].value = defaultCommand[index]?.cmd ?? commandCopy.value[index].cmd;
					}
					break;
				case 'teamMode':
					index = commandCopy.value.findIndex((value) => value.cmd === '!mp set');
					if (val.teamMode && val.scoreMode) {
						commandCopy.value[index].value = `${defaultCommand[index].cmd} ${val.teamMode} ${val.scoreMode}`;
					} else {
						commandCopy.value[index].value = defaultCommand[index]?.cmd ?? commandCopy.value[index].cmd;
					}
					break;
				case 'banTeam':
					index = commandCopy.value.findIndex((value) => value.cmd === 'Next team to ban:');
					if (val.redTeam && val.blueTeam) {
						commandCopy.value[index].value = `${defaultCommand[index].cmd} ${val.banTeam}`;
					} else {
						configList.value.banTeam = "";
						commandCopy.value[index].value = defaultCommand[index]?.cmd ?? commandCopy.value[index].cmd;
					}
					break;
				case 'pickTeam':
					index = commandCopy.value.findIndex((value) => value.cmd === 'Next team to pick:');
					if (val.redTeam && val.blueTeam) {
						commandCopy.value[index].value = `${defaultCommand[index].cmd} ${val.pickTeam}`;
					} else {
						configList.value.pickTeam = "";
						commandCopy.value[index].value = defaultCommand[index]?.cmd ?? commandCopy.value[index].cmd;
					}
					break;
				case 'bo':
					if (val.bo && val.bo > 0) {
						configList.value.maxWinRound = val.bo % 2 === 0 ? val.bo / 2 : Math.ceil(val.bo / 2);
					} else {
						configList.value.maxWinRound = null;
					}
					break;
				case 'timer':
					index = commandCopy.value.findIndex((value) => value.cmd === '!mp timer');
					commandCopy.value[index].value = `${defaultCommand[index].cmd} ${val.timer}`;
					break;
				case 'startTime':
					index = commandCopy.value.findIndex((value) => value.cmd === '!mp start');
					commandCopy.value[index].value = `${defaultCommand[index].cmd} ${val.startTime}`;
					break;
				case 'narratorSetting':
					if (val.narratorSetting.length > 0) {
						scoreWords = val.narratorSetting.includes("score") ? `${configList.value.redTeam} | ${configList.value.redTeamScore} - ${configList.value.blueTeamScore} | ${configList.value.blueTeam}` : "";
						index = commandCopy.value.findIndex((value) => value.cmd === 'Next team to pick:');
						pickWords = val.narratorSetting.includes("pick") ? commandCopy.value[index].value : "";
						poolWords = val.narratorSetting.includes("mappool") ? `Maps Remaining:${configList.value.mappool ?? ''}` : "";
						winnerWords = val.narratorSetting.includes("winner") ? `恭喜${configList.value.winner}获得本场比赛胜利，ggwp!` : "";
						configList.value.narrator = `${scoreWords}${configList.value.narratorSetting.length > 1 && configList.value.narratorSetting.includes("score") ? '\n' : ''}${pickWords}${configList.value.narratorSetting.length >= 2 && configList.value.narratorSetting.includes("pick") ? '\n' : ''}${poolWords}${configList.value.narratorSetting.length >= 2 && configList.value.narratorSetting.includes("mappool") ? '\n' : ''}${winnerWords}`;
					} else {
						configList.value.narrator = "";
					}

					break;
			}
		}
		if (val.maxWinRound) {
			if (val.redTeamScore === val.maxWinRound) configList.value.winner = val.redTeam;
			else if (val.blueTeamScore === val.maxWinRound) configList.value.winner = val.blueTeam;
			else configList.value.winner = "";
		}
	},
	{ deep: true, immediate: false }
);
</script>
<style lang="scss" scoped>
.page {
	padding: 0 10px;
	margin: -1px 0 0 0;
	height: 100%;

	.nav {
		margin: 0 0 10px 0;
		position: sticky;
		top: 0;
		z-index: 2;

		span+a {
			margin: 0 0 0 10px;
		}
	}

	.view {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: hidden;
		overflow-y: auto;
		height: 100%;
	}

	.command-list,
	.referee-list {
		width: 50%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.command-list {
		.command {
			:deep(.ant-typography) {
				word-break: break-all;
				align-items: center;
				display: flex;
			}

			:deep(.ant-typography-edit-content) {
				inset-inline-start: 2px;
				margin: 0;
			}
		}
	}

	.referee-list {

		.config-panel,
		.score-panel {
			display: flex;
			flex-direction: column;
			row-gap: 10px;
		}

		.config-panel {

			.prefix-bar,
			.mode-bar,
			.pick-bar div,
			.time-bar div {
				display: flex;
				flex-wrap: nowrap;
				column-gap: 10px;
			}

			.pick-bar,
			.time-bar {
				display: flex;
				flex-direction: column;
				row-gap: 10px;
			}
		}

		.score-panel {

			.vs-header {
				display: inline-flex;
				justify-content: center;
				width: 100%;
				align-items: center;
				flex-wrap: nowrap;

				div {
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
					text-align: center;
					width: 100%;

					* {
						margin: auto;

						:deep(.ant-input-number-input) {
							text-align: center;
							font-size: 30px;
						}
					}
				}

				div.vs {
					width: 10%;

					span:last-child {
						font-size: 18px;
					}
				}
			}

			.narrator-bar {
				display: flex;
				flex-wrap: nowrap;
				column-gap: 10px;
				text-wrap: nowrap;
			}
		}
	}
}

.operate-btn {
	font-size: 14px;
	display: flex;
	align-items: center;

	:deep(span + span) {
		margin-inline-start: 4px;
	}
}

[data-theme='light'] {
	.nav {
		background-color: #ffffff;
	}
}

[data-theme='dark'] {
	.nav {
		background-color: #141414;
	}
}
</style>
