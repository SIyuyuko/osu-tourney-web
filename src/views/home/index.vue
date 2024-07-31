<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 00:27:32
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-24 14:44:42
 * @FilePath: /osu!tourney-site/tourney-site/src/views/home/index.vue
 * @Description: 主页页面组件
-->
<template>
  <div class="page">
    <div class="overview">
      <div class="welcome-panel">
        <div class="user-state">
          <div class="state-words">
            <p>Welcome, {{ user.name }}!</p>
            <p>今天距离你第一次成为 {{ user.character }} 已经过去了 {{ duringTime }} 天</p>
          </div>
          <div class="avatar">
            <a-avatar shape="square" :size="72" :src="user.avatar"></a-avatar>
          </div>
        </div>
        <p class="time-words">{{ dailyWords }}</p>
      </div>
      <a-divider class="divider" type="vertical"></a-divider>
      <a-divider class="divider-mobile"></a-divider>
      <Coutdown />
    </div>
    <a-divider></a-divider>
    <div class="tour-view">
      <header>当前比赛</header>
      <div class="tournament-panel">
        <TournamentInfo />
        <PoolSelector />
      </div>
    </div>
  </div>
</template>
<script setup name="Home">
import Coutdown from '../../components/util/coutdown.vue';
import TournamentInfo from '../../components/tour/tournamentInfo.vue';
import PoolSelector from '../../components/map/poolSelector.vue';
import dayjs from 'dayjs';
import { ref, watch, onMounted, inject } from 'vue';
let user = inject('user');// 用户配置
const currentDate = dayjs(Date.now()).format('YYYY-MM-DD'); // 今天日期
const duringTime = dayjs(currentDate).diff(user.activeDate, 'day'); // 活跃时长/时间间隔
const currentTime = ref(dayjs(Date.now()).format('HH')); // 当前时间戳/小时
let dailyWords = '';// 时间段提示语
watch(
  currentTime,
  (val) => {
    if (val >= 6 && val <= 12) {
      dailyWords = user.dailyWords.morning;
    } else if (val >= 13 && val <= 18) {
      dailyWords = user.dailyWords.afternoon;
    } else if (val >= 19 && val <= 24) {
      dailyWords = user.dailyWords.evening;
    } else {
      dailyWords = user.dailyWords.night;
    }
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  setInterval(() => {
    currentTime.value = dayjs(Date.now()).format('HH');
  }, 1800000);
});
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;

  .overview {
    display: flex;
    column-gap: 20px;
    height: 160px;

    .welcome-panel {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .user-state {
        display: flex;
        column-gap: 20px;

        .state-words {
          width: 70%;

          p:first-child {
            font-size: 24px;
          }
        }

        .avatar {
          margin: 0 auto;
          align-items: center;
          display: flex;
        }
      }
    }

    .divider {
      height: 100%;
    }

    .divider-mobile {
      display: none;
    }
  }

  .tour-view {
    header {
      font-size: 24px;
    }

    .tournament-panel {
      display: flex;
      column-gap: 20px;
    }
  }
}

@media (max-width: 1024px) {
  .page {
    .overview {
      flex-wrap: wrap;
      height: 100%;

      .welcome-panel {
        width: 100%;

        .user-state {
          column-gap: 0;
        }
      }

      .divider {
        display: none;
      }

      .divider-mobile {
        display: flex;
      }
    }

    .tour-view {
      .tournament-panel {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }
    }
  }
}
</style>
