<template>
  <aside class="sidebar">
    <SidebarTop @toggle-darkmode="$emit('toggle-darkmode')" :darkMode="darkMode"/>
    <div class="search__wrapper">
      <SearchBox v-if="$site.themeConfig.search !== false"/>    
    </div>
    <NavLinks />
    <slot name="top" />
    <div v-bar>
      <div class="scroll-container">
        <ul v-if="items.length" class="sidebar-links">
          <li v-for="(item, i) in items" :key="i">
            <SidebarGroup
              v-if="item.type === 'group'"
              :item="item"
              :first="i === 0"
              :open="i === openGroupIndex"
              :collapsable="item.collapsable || item.collapsible"
              @toggle="toggleGroup(i)"
            />
            <SidebarLink v-else :item="item" />
          </li>
        </ul>
      </div>
    </div>
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import SearchBox from './SearchBox'
import SidebarTop from './SidebarTop'
import { isActive } from '../util'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks, SearchBox, SidebarTop },

  props: ['items', 'darkMode'],

  data() {
    return {
      openGroupIndex: 0
    }
  },

  watch: {
    $route() {
      this.refreshIndex()
    }
  },

  created() {
    this.refreshIndex()
  },

  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items)
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive(page) {
      return isActive(this.$route, page.regularPath)
    },
  }
}

function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

<style lang="stylus">
.sidebar
  display flex
  flex-direction column
  .search__wrapper
    margin-bottom 1rem
    padding 0 1.5rem 0.7rem
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    .dark-mode &
      border-bottom 1px solid $borderColorDark
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.25em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem
  .scroll-container
    // overflow-y scroll
    // flex 1
    // -webkit-overflow-scroll: touch

@media (max-width: $MQMobile)
  .sidebar
    .search__wrapper
      margin-top 0.5em
      margin-bottom 0
      padding 0 1.5rem
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
