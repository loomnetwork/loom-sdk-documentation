import Translation from './theme/plugin/translation'
import Vuebar from 'vuebar';
// import './public/js/drip';
// require('./public/js/drip');

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
        let target = to.path;
        target = `/en${to.path}`
        if (to.path.match(/([^\/]*)\/*$/)[1] === '') {
          target += 'intro-to-loom.html'
        }
        return next(target)
      }
    }
    const segments = to.path.match(/(?<!\?.+)(?<=\/)[\w-.]+(?=[/\r\n?]|$)/g)
    if (segments.length < 2 || segments[1] === '') {
      const target = `${to.path}intro-to-loom.html`
      return next(target)
    }
    
    return next()
  })
  Vue.use(Translation)
  Vue.use(Vuebar)
}