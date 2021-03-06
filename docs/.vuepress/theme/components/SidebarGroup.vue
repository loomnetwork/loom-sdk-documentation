<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <router-link
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ $t(item.title) }}</span>
      <span class="arrow" v-if="collapsable" :class="open ? 'down' : 'right'" />
    </router-link>

    <a href="javascript:;" v-else class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
      <span>{{ $t(item.title) }}</span>
      <span class="arrow" v-if="collapsable" :class="open ? 'down' : 'right'" />
    </a>

    <DropdownTransition>
      <SidebarLinks
        class="sidebar-group-items"
        :items="item.children"
        v-if="open || !collapsable"
        :sidebarDepth="item.sidebarDepth"
        :depth="depth + 1"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from '../util'
import DropdownTransition from './DropdownTransition.vue'
export default {
  name: 'SidebarGroup',
  props: ['item', 'open', 'collapsable', 'depth'],
  components: { DropdownTransition },
  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require('./SidebarLinks.vue').default
  },
  methods: { isActive }
}
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 1.36em
      font-weight 600 
      color: $sidebarCategoryColor
      padding-left 2rem
      display flex
      align-items center
      & > span:first-child
        flex 1
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 1.3em;
        border-left none
        font-weight 600
        color $sidebarLinkActiveColor
        &:not(:hover):not(.active)
          color $sidebarLinkColor
  &.depth-2
    & > .sidebar-heading
      border-left none
.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  padding 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  &.open, &:hover
    color inherit
  .arrow
    position relative
  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor
    &:hover
      color $accentColor
.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden
</style>
