<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 16:42:54
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-08-26 09:46:22
 * @FilePath: /tourney-site/src/components/util/coutdown.vue
 * @Description: 倒计时组件
-->
<template>
  <div class="countdown-panel">
    <div class="countdown">
      <a-statistic-countdown
        v-if="banner.eventTime && banner.event"
        :value="deadline"
        :format="$i18n.locale === 'zh' ? 'D 天 H 时 m 分 s 秒' : `D day H hour m [min] s [second] ` + $t('banner.countdownSuffix')"
        @finish="stopCountdown"
        :class="isFinished ? 'finished' : ''"
      >
        <template #title>
          <span class="title-prefix">Next Event:</span>
          <a-tooltip placement="bottomLeft">
            <template #title>
              <span><font-awesome-icon icon="fa-regular fa-clock" /> {{ banner.eventTime }}</span>
            </template>
            <span class="title"><font-awesome-icon icon="fa-solid fa-calendar-days" /> {{ banner.event }}</span>
          </a-tooltip>
        </template>
        <template #prefix>
          <font-awesome-icon class="countdown-prefix" icon="fa-regular fa-hourglass-half" />
        </template>
        <template #suffix>
          <span>{{ banner.eventEndTips }}</span>
        </template>
      </a-statistic-countdown>
      <a-empty v-else description="暂无事件" :image="Empty.PRESENTED_IMAGE_SIMPLE" style="width: 100%" />
    </div>
    <!-- <div class="operate-button-group">
      <a-button type="text" title="配置事件">
        <font-awesome-icon icon="fa-solid fa-wrench" rotation="270" />
      </a-button>
      <a-button type="text" title="编辑事件">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
      </a-button>
      <a-button type="text" title="删除事件">
        <font-awesome-icon icon="fa-solid fa-eraser" />
      </a-button>
    </div> -->
  </div>
  <!-- <a-alert :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />
  <a-calendar :value="date" @select="onSelect" @panelChange="onPanelChange" /> -->
</template>
<script setup name="Countdown">
import { Empty } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
let banner = window.banner; // 横幅配置
const deadline = dayjs(banner.eventTime); // 事件时间
let isFinished = ref(false); // 倒计时是否结束
let nowTime = dayjs(); // 当前时间

// 倒计时结束回调事件
function stopCountdown() {
  isFinished.value = true;
}

onMounted(() => {
  nowTime = dayjs();
  // 判断事件倒计时是否结束
  if (nowTime.diff(deadline) > 0) {
    stopCountdown();
  }
});
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

    .title:hover {
      cursor: pointer;
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
