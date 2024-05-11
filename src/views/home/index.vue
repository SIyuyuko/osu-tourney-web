<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-07 00:27:32
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-05-09 11:21:54
 * @FilePath: /tourney-site/src/views/home/index.vue
 * @Description: 主页页面组件
-->
<template>
  <div class="page">
    <div class="overview">
      <div class="welcome-panel">
        <div class="user-state">
          <div class="state-words">
            <p>Welcome, SIyuyuko!</p>
            <p>今天距离你第一次担任 Staff 已经过去了 565 天</p>
          </div>
          <div class="avatar">
            <a-avatar shape="square" :size="72" src="src/assets/image/user/avatar.jpg"></a-avatar>
          </div>
        </div>
        <p class="time-words">夜深了，还在努力肝主表格吗</p>
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
    header{
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
