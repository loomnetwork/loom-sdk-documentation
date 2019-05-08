<template>
  <div class="sidebar-top">
    <router-link :to="$localePath" class="home-link">
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
    </router-link>
    <button class="theme-swtich" @click="switchThemeMode">
      <img :src="switchBtnImage" />
    </button>
  </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import NavLinks from './NavLinks.vue'
import { toggleDarkMode } from '../util'
export default {
  components: { SidebarButton, NavLinks },
  data() {
    return {
      linksWrapMaxWidth: null,
      darkMode: false
    }
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },
  computed: {
    switchBtnImage() {
      return this.darkMode ? this.$withBase('/img/theme-dark.svg') : this.$withBase('/img/theme-light.svg')
    }
  },
  methods: {
    switchThemeMode() {
      this.darkMode = !this.darkMode
      toggleDarkMode(this.darkMode)
    }
  }
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.sidebar-top
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 2.1rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align middle
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
  .theme-swtich
    background-color transparent
    border none
    box-shadow none 
    padding 0
    outline none
    cursor pointer
    vertical-align middle
    width 29px
    height 29px
    float: right
@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
</style>
