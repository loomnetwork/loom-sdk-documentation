import Translation from './theme/plugin/translation'
import Vuebar from 'vuebar';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  Vue.prototype.$themeConfig = siteData.themeConfig
  router.beforeEach((to, from, next) => {
    let locale = to.path.replace(/^\/([^\/]+).*/i,'$1');
    if (siteData.locales) {
      const localeKeys = Object.keys(siteData.locales)
      const locales = localeKeys.map((key) => (siteData.locales[key].lang))
      if (locales.indexOf(locale) === -1) {
        const target = `/en${to.path}`
        console.log(target)
        next(target)
      }
    }
    return next()
  })
  Vue.use(Translation)
  Vue.use(Vuebar)
}