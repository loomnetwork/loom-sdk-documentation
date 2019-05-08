import Translation from './theme/plugin/translation'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  Vue.prototype.$themeConfig = siteData.themeConfig
  router.beforeEach((to, from, next) => {
    // if router locale indicates /en/, redirect
    if(/\/en\//.test(to.path)) {
      const target = to.path.slice(3) || '/'
      next(target)
    }
    return next()
  })
  Vue.use(Translation)
}