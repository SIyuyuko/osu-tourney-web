<!--
 * @Author: SIyuyuko
 * @Date: 2024-05-14 17:43:46
 * @LastEditors: SIyuyuko
 * @LastEditTime: 2024-07-29 16:08:01
 * @FilePath: /osu!tourney-site/tourney-site/src/views/setting.vue
 * @Description: 设置页面
-->
<template>
  <div class="setting-page" :data-theme="theme">
    <a-alert message="配置文件路径在 'public/config/'" type="info" />
    <div class="setting-button-group">
      <a-button @click="res.open()">打开</a-button>
      <a-button @click="res.updateData()">刷新</a-button>
      <a-button @click="res.create()">新建</a-button>
      <a-button :disabled="!res.file.value" @click="onSave">保存</a-button>
      <a-button :disabled="!res.file.value" @click="res.saveAs()">另存为</a-button>
    </div>
    <span>{{ str.fileName }}</span>
    <!-- <pre class="code-block" lang="yaml">{{ str }}</pre> -->
    <div v-if="content">
      <span>配置项</span>
      <a-textarea v-if="typeof content === 'string'" v-model:value="content" :rows="20"></a-textarea>
      <span v-else>{{ content }}</span>
    </div>
  </div>
</template>
<script setup name="Setting">
import { reactive, ref, onMounted, inject } from 'vue';
import { useFileSystemAccess } from '@vueuse/core';
import dayjs from 'dayjs'
let theme = inject('themeMode');
const dataType = ref('Text'); // 数据类型
// 文件系统 res
const res = useFileSystemAccess({
  dataType,
  types: [
    {
      description: dataType.value === "Text" ? 'text' : "Images",
      accept: {
        // 'text/plain': ['.txt', '.html'],
        'text/javascript': '.js',
      },
    },
  ],
  excludeAcceptAllOption: true,
});
const content = res.data;// 文件内容
// 文件信息
const str = reactive({
  isSupported: res.isSupported,// 当前环境是否支持上传文件
  file: res.file,// 文件格式
  fileName: res.fileName,// 文件名称
  fileMIME: res.fileMIME,// 文件类型
  fileSize: res.fileSize,// 文件大小
  fileLastModified: dayjs(res.fileLastModified),// 文件上次修改时间
});

async function onSave() {
  await res.save();
}
onMounted(() => {
});
</script>
<style lang="scss" scoped>
[data-theme='dark'] {
  color: #ffffff;
}

.setting-page {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.setting-button-group {
  display: flex;
  justify-content: space-between;
}
</style>
