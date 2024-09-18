<!--
 * @Author: SIyuyuko
 * @Date: 2024-08-02 17:55:00
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-09-18 15:40:49
 * @FilePath: /tourney-site/src/views/command/index.vue
 * @Description: 指令列表组件
-->
<template>
  <div class="page no-scroll">
    <div class="view" ref="viewRef">
      <div class="command-list" v-if="commandCopy">
        <div class="nav">
          <span>{{ $t('command.list') }}</span>
          <a :href="wikiUrl" target="_blank" :title="$t('command.seeWiki')">wiki</a>
          <a-button class="expand-btn" type="link" @click="showCommand = !showCommand">
            <font-awesome-icon v-if="showCommand" icon="fa-solid fa-compress" />
            <font-awesome-icon v-else icon="fa-solid fa-expand" />
          </a-button>
        </div>
        <p class="command" v-for="(item, index) in commandList" :key="index" :class="showCommand ? '' : 'hidden'">
          <span>{{ index + 1 }}. </span><span>{{ item.name }}</span>
          <a-typography-paragraph v-model:content="commandCopy[index].value" :editable="{ tooltip: false }" :copyable="{ tooltip: false }" keyboard>
            <template #editableIcon>
              <a-button class="operate-btn" type="default" size="small"
                >{{ $t('command.edit') }}
                <template #icon>
                  <span><font-awesome-icon icon="fa-solid fa-pencil" /></span>
                </template>
              </a-button>
            </template>
            <template #copyableIcon="{ copied }">
              <a-button class="operate-btn" type="primary" size="small"
                >{{ $t('command.copy') }}
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
      <a-divider :type="showCommand ? 'vertical' : 'horizontal'" style="height: auto" :style="!showCommand ? { margin: '20px 0' } : {}"></a-divider>
      <a-collapse class="referee-list" v-model:activeKey="activeKey" :bordered="false" ghost>
        <template #expandIcon="{ isActive }">
          <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel key="1" :header="$t('command.refereeTitle')">
          <div class="config-panel">
            <div class="prefix-bar">
              <a-input v-model:value="prefix" allow-clear :placeholder="$t('command.inputTour')" style="width: 70%">
                <template #prefix>
                  <font-awesome-icon icon="fa-solid fa-chess" />
                </template>
              </a-input>
              <a-input-number v-model:value="bo" addon-before="Best of" :min="0" style="width: 30%"></a-input-number>
            </div>
            <a-input v-model:value="redTeam" allow-clear :placeholder="$t('command.inputRedTeam')">
              <template #prefix>
                <font-awesome-icon icon="fa-solid fa-users-line" style="color: var(--team-red)" />
              </template>
            </a-input>
            <a-input v-model:value="blueTeam" allow-clear :placeholder="$t('command.inputBlueTeam')">
              <template #prefix>
                <font-awesome-icon icon="fa-solid fa-users-line" style="color: var(--team-blue)" />
              </template>
            </a-input>
            <div class="mode-bar">
              <a-select v-model:value="teamMode" :options="teamOptions" style="width: calc(50% - 5px)" allowClear :placeholder="$t('command.selectTeamMode')">
                <template #suffixIcon>
                  <font-awesome-icon icon="fa-solid fa-user-group" />
                </template>
              </a-select>
              <a-select v-model:value="scoreMode" :options="scoreOptions" style="width: calc(50% - 5px)" allowClear :placeholder="$t('command.selectScoreMode')">
                <template #suffixIcon>
                  <font-awesome-icon icon="fa-solid fa-ranking-star" />
                </template>
              </a-select>
              <a-input-number v-model:value="ts" :addon-before="$t('command.teamsize')" :min="1" style="width: calc(50% - 5px)"></a-input-number>
            </div>
            <div class="time-bar">
              <div>
                <span>{{ $t('command.timerTime') }}</span>
                <a-radio-group v-model:value="timer">
                  <a-radio :value="60">60{{ $t('command.sec') }}</a-radio>
                  <a-radio :value="90">90{{ $t('command.sec') }}</a-radio>
                  <a-radio :value="120">120{{ $t('command.sec') }}</a-radio>
                  <a-input-number v-model:value="timer" :min="0" :addon-after="$t('command.sec')"></a-input-number>
                </a-radio-group>
              </div>
              <div>
                <span>{{ $t('command.startTime') }}</span>
                <a-radio-group v-model:value="startTime">
                  <a-radio :value="10">10{{ $t('command.sec') }}</a-radio>
                  <a-radio :value="15">15{{ $t('command.sec') }}</a-radio>
                  <a-radio :value="30">30{{ $t('command.sec') }}</a-radio>
                  <a-input-number v-model:value="startTime" :min="0" :addon-after="$t('command.sec')"></a-input-number>
                </a-radio-group>
              </div>
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" :header="$t('command.scoreBoard')">
          <div class="score-panel">
            <div class="vs-header">
              <div>
                <span :title="redTeam"
                  ><font-awesome-icon v-if="redTeamScore !== maxWinRound || !redTeamScore" icon="fa-solid fa-users-line" style="color: var(--team-red)" />
                  <font-awesome-icon v-else icon="fa-solid fa-crown" style="color: var(--team-winner)" />
                  {{ redTeam }}
                </span>
                <a-input-number v-model:value="redTeamScore" :min="0" :max="maxWinRound ? maxWinRound : 100" :bordered="false" />
              </div>
              <div class="vs">
                <span>VS</span>
                <span>:</span>
              </div>
              <div>
                <span :title="blueTeam"
                  ><font-awesome-icon v-if="blueTeamScore !== maxWinRound || !blueTeamScore" icon="fa-solid fa-users-line" style="color: var(--team-blue)" />
                  <font-awesome-icon v-else icon="fa-solid fa-crown" style="color: var(--team-winner)" />
                  {{ blueTeam }}
                </span>
                <a-input-number v-model:value="blueTeamScore" :min="0" :max="maxWinRound ? maxWinRound : 100" :bordered="false" />
              </div>
            </div>
            <div class="pick-bar" v-if="redTeam && blueTeam">
              <div>
                <span>{{ $t('command.banTeam') }}</span>
                <a-radio-group v-model:value="banTeam">
                  <a-radio :value="redTeam">{{ redTeam }}</a-radio>
                  <a-radio :value="blueTeam">{{ blueTeam }}</a-radio>
                </a-radio-group>
              </div>
              <div>
                <span>{{ $t('command.pickTeam') }}</span>
                <a-radio-group v-model:value="pickTeam">
                  <a-radio :value="redTeam">{{ redTeam }}</a-radio>
                  <a-radio :value="blueTeam">{{ blueTeam }}</a-radio>
                </a-radio-group>
              </div>
            </div>
            <!-- 对阵信息 -->
            <div class="narrator-bar">
              <span>{{ $t('command.bracketTitle') }}</span>
              <a-typography-text v-if="bracketWords.length > 0" copyable style="white-space: pre-line; display: flex; align-items: center" code>
                {{ bracketWords }}
                <template #copyableIcon="{ copied }">
                  <span v-if="!copied" key="copy-icon">
                    <font-awesome-icon icon="fa-regular fa-copy" />
                  </span>
                  <span v-else key="copied-icon">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </span>
                </template>
                <template #copyableTooltip="{ copied }">
                  <span v-if="!copied" key="copy-tooltip">{{ $t('command.copy') }}</span>
                  <span v-else key="copied-tooltip">{{ $t('command.copied') }}</span>
                </template>
              </a-typography-text>
            </div>
            <!-- 报幕配置 -->
            <div class="narrator-bar">
              <span>{{ $t('command.narratorTitle') }}</span>
              <a-checkbox-group v-model:value="narratorSetting" :options="narratorOptions" />
            </div>
            <a-typography-text v-if="narratorSetting.length > 0" copyable style="white-space: pre-line; display: flex; align-items: center" code>
              {{ narrator }}
              <template #copyableIcon="{ copied }">
                <span v-if="!copied" key="copy-icon">
                  <font-awesome-icon icon="fa-regular fa-copy" />
                </span>
                <span v-else key="copied-icon">
                  <font-awesome-icon icon="fa-solid fa-check" />
                </span>
              </template>
              <template #copyableTooltip="{ copied }">
                <span v-if="!copied" key="copy-tooltip">{{ $t('command.copy') }}</span>
                <span v-else key="copied-tooltip">{{ $t('command.copied') }}</span>
              </template>
            </a-typography-text>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="3" :header="$t('command.mappool')">
          <PoolSelector class="pool-selector" v-if="mappool" :isReferee="true" @update="getMappool" />
          <a-empty v-else :description="$t('mappool.empty')" :image="Empty.PRESENTED_IMAGE_SIMPLE" style="width: 100%" />
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script setup name="Command">
import { Empty } from 'ant-design-vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import PoolSelector from '@/components/map/poolSelector.vue';
import i18n from '@/language';
let commandCopy = ref();
let defaultCommand = null;
let commandList = computed({
  get() {
    return window.command.list;
  },
});
const activeKey = ref([1, 2]);
let showCommand = ref(true); // 是否显示指令列表
const viewRef = ref(null);
const element = ref();
// 监听元素宽度
useResizeObserver(viewRef, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  element.value = { width: width, height: height };
});
watch(element, (val) => {
  if (val.width > 810) {
    showCommand.value = true;
  }
});
// 配置项
let prefix = ref(''); //比赛缩写
let redTeam = ref(''); //红队队名
let blueTeam = ref(''); //蓝队队名
let teamMode = ref(null); //组队模式
let scoreMode = ref(null); //计分模式
let bo = ref(null); //对阵场数
let ts = ref(1); //队伍人数
let maxWinRound = ref(null); //比赛胜利场数
let redTeamScore = ref(0); //红队得分
let blueTeamScore = ref(0); //蓝队得分
let banTeam = ref(''); //ban图队伍
let pickTeam = ref(''); //选图队伍
let timer = ref(''); //倒计时时间
let startTime = ref(''); //比赛开始时间
let winner = ref('winner'); //获胜方
let narratorSetting = ref([]); //报幕配置
let mappool = ref([]); //图池
let narrator = ref(''); //报幕文字集合
// #region 选择项
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
  { label: computed(() => i18n.global.t('command.score')), value: 'score' },
  { label: computed(() => i18n.global.t('command.pick')), value: 'pick' },
  { label: computed(() => i18n.global.t('command.mapRemain')), value: 'mappool' },
  { label: computed(() => i18n.global.t('command.winner')), value: 'winner' },
]);
// #endregion
// 报幕文字
let scoreWords = ''; //比分报幕
let pickWords = ''; //选图报幕
let poolWords = ''; //图池余量报幕
let winnerWords = ''; //获胜报幕
let redTeamWord = computed(() => i18n.global.t('command.redTeam')); //红队文字
let blueTeamWord = computed(() => i18n.global.t('command.blueTeam')); //蓝队文字
let slotWord = computed(() => i18n.global.t('command.slot')); //格子文字
let winPrefix = computed(() => i18n.global.t('command.winPrefix')); //获胜文字前缀
let winSuffix = computed(() => i18n.global.t('command.winSuffix')); //获胜文字后缀
let locale = computed(() => i18n.global.locale); //多语言
let wikiUrl = computed(() => {
  return `https://osu.ppy.sh/wiki/${locale.value}/osu%21_tournament_client/osu%21tourney/Tournament_management_commands`;
}); // 比赛指令wiki链接
let bracketWords = computed(() => {
  return `${redTeam.value ? redTeam.value + ':' + redTeamWord.value : redTeamWord.value} & ${slotWord.value} ${ts.value > 1 ? `1-${ts.value}` : 1} // ${blueTeam.value ? blueTeam.value + ':' + blueTeamWord.value : blueTeamWord.value} & ${slotWord.value} ${ts.value > 1 ? `${ts.value + 1}-${ts.value * 2}` : 2}`;
}); //对阵信息
// 获取图池列表
function getMappool(value) {
  if (value) {
    mappool.value = value.map
      .filter((item) => item.checkStatus === false || !item.checkStatus)
      .map((item) => {
        item = item.mod + item.index;
        return item;
      });
  }
}
onMounted(() => {
  commandCopy.value = window.command.list.map((e) => {
    e.value = e.cmd;
    return e;
  });
  defaultCommand = window.command.list;
  showCommand.value = true;
});
// #region 监听配置项更新指令
// 队伍信息监听
watch([prefix, redTeam, blueTeam], () => {
  let index = commandCopy.value.findIndex((value) => value.type === 'create');
  if (prefix.value && redTeam.value && blueTeam.value) {
    commandCopy.value[index].value = `${defaultCommand[index].cmd} ${prefix.value}:(${redTeam.value})vs(${blueTeam.value})`;
  } else {
    commandCopy.value[index].value = defaultCommand[index]?.cmd ?? commandCopy.value[index].cmd;
  }
});
// 比赛模式监听
watch([scoreMode, teamMode], () => {
  let index = commandCopy.value.findIndex((value) => value.type === 'room');
  if (teamMode.value && scoreMode.value) {
    commandCopy.value[index].value = `${defaultCommand[index].cmd} ${teamMode.value} ${scoreMode.value}`;
  } else {
    commandCopy.value[index].value = defaultCommand[index]?.cmd ?? commandCopy.value[index].cmd;
  }
});
// 选图队伍监听
watch([banTeam, pickTeam], () => {
  let banIndex = commandCopy.value.findIndex((value) => value.type === 'ban');
  let pickIndex = commandCopy.value.findIndex((value) => value.type === 'pick');
  if (redTeam && blueTeam) {
    commandCopy.value[banIndex].value = `${defaultCommand[banIndex].cmd} ${banTeam.value}`;
    commandCopy.value[pickIndex].value = `${defaultCommand[pickIndex].cmd} ${pickTeam.value}`;
  } else {
    banTeam.value = '';
    commandCopy.value[banIndex].value = defaultCommand[banIndex]?.cmd ?? commandCopy.value[banIndex].cmd;
    pickTeam.value = '';
    commandCopy.value[pickIndex].value = defaultCommand[pickIndex]?.cmd ?? commandCopy.value[pickIndex].cmd;
  }
});
// 比赛胜利场数监听
watch(bo, () => {
  if (bo.value && bo.value > 0) {
    maxWinRound.value = bo.value % 2 === 0 ? bo.value / 2 : Math.ceil(bo.value / 2);
  } else {
    maxWinRound.value = null;
  }
});
watch([maxWinRound, redTeamScore, blueTeamScore], ([val]) => {
  if (val) {
    if (redTeamScore.value >= val) {
      redTeamScore.value = val;
      winner.value = redTeam.value;
    } else if (blueTeamScore.value >= val) {
      blueTeamScore.value = val;
      winner.value = blueTeam.value;
    } else {
      winner.value = 'winner';
    }
  }
});
// 时间监听
watch(timer, () => {
  let timerIndex = commandCopy.value.findIndex((value) => value.type === 'timer');
  commandCopy.value[timerIndex].value = `${defaultCommand[timerIndex].cmd} ${timer.value}`;
});
watch(startTime, () => {
  let startIndex = commandCopy.value.findIndex((value) => value.type === 'start');
  commandCopy.value[startIndex].value = `${defaultCommand[startIndex].cmd} ${startTime.value}`;
});
// 报幕配置监听
watch([narratorSetting, redTeam, blueTeam, redTeamScore, blueTeamScore, pickTeam, banTeam, mappool, winner, locale], ([val]) => {
  scoreWords = narratorSetting.value.includes('score') ? `${redTeam.value} | ${redTeamScore.value} - ${blueTeamScore.value} | ${blueTeam.value}` : '';
  let index = commandCopy.value.findIndex((value) => value.type === 'pick');
  pickWords = narratorSetting.value.includes('pick') ? commandCopy.value[index].value : '';
  poolWords = narratorSetting.value.includes('mappool') ? `Maps Remaining:${mappool.value ?? ''}` : '';
  winnerWords = narratorSetting.value.includes('winner') ? `${winPrefix.value}${winner.value}${winSuffix.value}` : '';
  // 监听报幕数组
  if (val.length > 0) {
    narrator.value = `${scoreWords}${val.length > 1 && val.includes('score') ? ' // ' : ''}${pickWords}${val.length >= 2 && val.includes('pick') ? ' // ' : ''}${poolWords}${val.length >= 2 && val.includes('mappool') && val.includes('winner') ? ' // ' : ''}${winnerWords}`;
  } else {
    narrator.value = '';
  }
});
// #endregion
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
    align-items: center;
    display: flex;

    span + a {
      margin: 0 0 0 10px;
    }

    .expand-btn {
      visibility: hidden;
      transition: ease all 0.3s;
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

    .config-panel .time-bar,
    .score-panel .pick-bar {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }

    .prefix-bar,
    .mode-bar,
    .pick-bar div,
    .time-bar div {
      display: flex;
      flex-wrap: nowrap;
      column-gap: 10px;
      align-items: center;
      text-wrap: nowrap;
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

.pool-selector {
  max-width: 100%;
}

[data-theme='light'] {
  .nav {
    background-color: #ffffff;
  }
}

[data-theme='dark'] {
  .nav {
    background-color: var(--theme-black);
  }
}
@media (max-width: 900px) {
  .page {
    .view {
      flex-wrap: wrap;
      display: block;
      .command-list,
      .referee-list {
        width: 100%;
      }
      .command-list {
        position: relative;
        .nav {
          position: fixed;
          top: auto;
          width: 90%;
        }

        .expand-btn {
          visibility: visible;
          transition: ease all 0.3s;
        }
        .nav + .command {
          margin: 30px 0 0 0;
        }
        .command.hidden {
          display: none;
        }
      }
      .referee-list > div > * {
        padding: 0;
      }
    }
  }
}
</style>
