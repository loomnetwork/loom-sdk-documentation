import defaultMessage from '../../locales/en.json'
import zhCN from '../../locales/zh-CN.json'
import jpJA from '../../locales/ja.json'
import koKR from '../../locales/ko.json'

export default function translation(Vue) {
  const langs = {
    en: defaultMessage,
    'zh-CN': zhCN,
    'jp': jpJA,
    'ko': koKR
  }

  Vue.mixin({
    computed: {
      getTranslation() {
        return {
          ...langs[this.$lang],
          ...this.$themeLocaleConfig.translation
        }
      }
    },
    // async mounted() {
    //   await this.loadLocale(this.$lang)
    // },
    methods: {  
      $t(key) {
        return this.getTranslation[key] || key
      },
      // async loadLocale(locale) {
      //   if (langs[locale] === undefined) {
      //     const msgs = await import(`../../locales/${this.$lang}.json`)
      //     langs[locale] = msgs
      //   }
      // },
      getUrl(url) {        
        return this.$lang && this.$lang !== 'en' ? '/' + this.$lang + url : url 
      }
    }  
  })
}