<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 16:42:54
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-10 15:48:55
 * @FilePath: /osu!tourney-site/tourney-site/src/components/util/coutdown.vue
 * @Description: 倒计时组件
-->
<template>
  <div class="countdown-panel">
    <div class="countdown">
      <a-statistic-countdown :value="deadline" format="D 天 H 时 m 分 s 秒" @finish="stopCountdown"
        :class="isFinished ? 'finished' : ''">
        <template #title>
          <span class="title-prefix">Next Event:</span>
          <span class="title">Yuyuko's Hidden Cup Season 5</span>
        </template>
        <template #prefix>
          <font-awesome-icon class="countdown-prefix" icon="fa-regular fa-hourglass-half" />
        </template>
        <template #suffix>
          <span>Time is over.</span>
        </template>
      </a-statistic-countdown>
    </div>
    <div class="operate-button-group">
      <a-button type="text" title="配置事件">
        <font-awesome-icon icon="fa-solid fa-wrench" rotation="270" />
      </a-button>
      <a-button type="text" title="编辑事件">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
      </a-button>
      <a-button type="text" title="删除事件">
        <font-awesome-icon icon="fa-solid fa-eraser" />
      </a-button>
    </div>
  </div>
  <!-- <a-alert :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />
  <a-calendar :value="date" @select="onSelect" @panelChange="onPanelChange" /> -->
</template>
<script setup name="Countdown">
import { ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
const deadline = Date.now() + 10 * 60 * 60 * 2 * 2;
let isFinished = ref(false); // 倒计时是否结束
const date = ref(dayjs('2017-01-25'));
const selectedValue = ref(dayjs('2017-01-25'));

// 倒计时结束回调事件
function stopCountdown() {
  isFinished.value = true;
}

const onSelect = (value) => {
  date.value = value;
  selectedValue.value = value;
  console.log(selectedValue.value);
};
const onPanelChange = (value) => {
  date.value = value;
};
</script>
<style lang="scss" scoped>
.countdown-panel {
  display: flex;
  column-gap: 20px;
  width: 55%;

  .countdown {
    width: 80%;

    .ant-statistic {
      height: 100%;

      :deep(.ant-statistic-title) {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }

      :deep(.ant-statistic-content) {
        display: flex;
        flex-wrap: nowrap;
        font-size: 24px;

        .ant-statistic-content-suffix {
          display: none;
        }
      }


    }

    .ant-statistic.finished {
      :deep(.ant-statistic-content) {
        .ant-statistic-content-value {
          display: none;
        }

        .ant-statistic-content-suffix {
          display: block;
        }
      }

      // :deep()
    }

    .title-prefix {
      font-size: 20px;
    }

    .title {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      white-space: nowrap;
    }

    .countdown-prefix {
      margin: 0 5px 0 0;
    }
  }

  .ant-statistic,
  .operate-button-group {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    margin: 0 0 0 auto;
  }
}

@media (max-width: 1024px) {
  .countdown-panel {
    width: 100%;

    .countdown {
      .ant-statistic {
        :deep(.ant-statistic-title) {
          row-gap: 0;
        }
      }
    }
  }
}
</style>
