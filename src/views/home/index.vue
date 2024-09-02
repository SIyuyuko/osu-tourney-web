<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 00:27:32
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-09-02 14:41:13
 * @FilePath: /tourney-site/src/views/home/index.vue
 * @Description: 主页页面组件
-->
<template>
  <div class="page">
    <div class="overview">
      <div class="welcome-panel">
        <div class="user-state">
          <div class="state-words">
            <p>Welcome, {{ userInfo ? userInfo.username : user.name }}!</p>
            <p v-if="user.character">{{ $t('home.rulePrefix') }} {{ user.character }} {{ $t('home.ruleMid') }} {{ duringTime }} {{ $t('home.ruleSuffix') }}</p>
          </div>
          <div class="avatar">
            <a-tooltip placement="bottom">
              <template #title v-if="userInfo">
                <span>{{ $t('home.viewProfile') }}</span>
              </template>
              <a-avatar class="avatar-img" shape="square" :size="72" :src="userInfo ? userInfo.avatar_url : user.avatar" @click="openUrl"></a-avatar>
            </a-tooltip>
          </div>
        </div>
        <p class="time-words">{{ dailyWords }}</p>
      </div>
      <a-divider class="divider" type="vertical"></a-divider>
      <a-divider class="divider-mobile"></a-divider>
      <Countdown v-if="banner.bannerType === 'countdown'" />
      <Cover v-if="banner.bannerType === 'cover'" :info="userInfo" />
    </div>
    <a-divider></a-divider>
    <div class="tour-view">
      <header>{{ $t('home.tourTitle') }}</header>
      <div class="tournament-panel">
        <TournamentInfo />
        <PoolSelector />
      </div>
    </div>
  </div>
</template>
<script setup name="Home">
import Countdown from '../../components/util/countdown.vue';
import Cover from '../../components/util/cover.vue';
import TournamentInfo from '../../components/tour/tournamentInfo.vue';
import PoolSelector from '../../components/map/poolSelector.vue';
import { getUserInfo } from '@/api/data_api';
import dayjs from 'dayjs';
import { ref, watch, onMounted } from 'vue';
let user = window.user; // 用户配置
let userInfo = ref(); // 用户api信息
let infoUrlPrefix = 'https://osu.ppy.sh/users/'; // osu!个人主页网址前缀
const currentDate = dayjs(Date.now()).format('YYYY-MM-DD'); // 今天日期
const duringTime = dayjs(currentDate).diff(user.activeDate, 'day'); // 活跃时长/时间间隔
const currentTime = ref(dayjs(Date.now()).format('HH')); // 当前时间戳/小时
let dailyWords = ref(''); // 时间段提示语
let banner = window.banner;
watch(
  currentTime,
  (val) => {
    if (val >= 6 && val <= 12) {
      dailyWords.value = user.dailyWords.morning;
    } else if (val >= 13 && val <= 18) {
      dailyWords.value = user.dailyWords.afternoon;
    } else if (val >= 19 && val <= 24) {
      dailyWords.value = user.dailyWords.evening;
    } else {
      dailyWords.value = user.dailyWords.night;
    }
  },
  {
    immediate: true,
  }
);
// 打开osu主页链接
function openUrl() {
  window.open(infoUrlPrefix + user.uid, '_blank');
}
onMounted(() => {
  setInterval(() => {
    currentTime.value = dayjs(Date.now()).format('HH');
  }, 900000);
  // 配置uid时请求用户信息，否则以本地配置渲染
  if (user.uid !== 0 && typeof user.uid === 'number') {
    getUserInfo(user.uid).then((res) => {
      if (res) {
        userInfo.value = res.data;
      }
    });
  }
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
          .avatar-img:hover {
            cursor: pointer;
          }
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
