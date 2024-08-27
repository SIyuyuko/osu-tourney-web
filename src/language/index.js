import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const i18n = createI18n({
  locale: 'zh', // 默认显示语言
  fallbackLocale:'zh',
  messages: {
    zh: zhCN,
    en: enUS
  }
})

export default i18n