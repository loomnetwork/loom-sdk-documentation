<template>
  <main class="page">
    <slot name="top" />
    <Navbar @toggle-sidebar="$emit('toggle-sidebar')" @toggle-darkmode="$emit('toggle-darkmode')" :darkMode="darkMode"/>

    <Content ref="content" />

    <footer class="page-edit">
      <div v-if="editLink" class="edit-link">
        <a :href="editLink" target="_blank" rel="noopener noreferrer">
          {{ editLinkText }}
        </a>
        <OutboundLink />
      </div>

      <div style="float: right">
        <small ref="counter" class="word-count">
          <small><span class="octicon octicon-file"/></small>
          <span id="word" />
          <small><span class="octicon octicon-clock"/></small>
          <span id="time" />
        </small>

        <div :id="slug" class="leancloud-visitors">
          <span class="prefix">
            <small><span class="octicon octicon-eye"/></small>
          </span>
          <span class="pv leancloud-visitors-count" />
        </div>
      </div>
      <div class="ask-question" v-html="$t('ask_on_tg')"></div>
    </footer>

    <div v-if="prev || next" class="page-nav">
      <p class="inner">
        <span v-if="prev" class="prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
            <g fill="none" fill-rule="nonzero" stroke="#3C91E6" stroke-width="2">
              <path d="M9 15L2 8l7-7M2 8h16"/>
            </g>
          </svg>
          <router-link v-if="prev" class="prev" :to="prev.path">
            {{ $t(prev.title) || $t(prev.path) }}
          </router-link>
        </span>

        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ $t(next.title) || $t(next.path) }}
          </router-link>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
            <g fill="none" fill-rule="nonzero" stroke="#3C91E6" stroke-width="2">
              <path d="M9 15l7-7-7-7M16 8H0"/>
            </g>
          </svg>
        </span>
      </p>
    </div>
    <slot name="bottom" />
  </main>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE, wordcount, min2read } from '../util'
import NavLinks from './NavLinks.vue'
import Navbar from './Navbar.vue'

export default {
  components: {NavLinks, Navbar},
  props: ['sidebarItems', 'darkMode'],

  computed: {
    valine() {
      return this.$site.themeConfig.valine || {}
    },

    slug() {
      return this.$page.path || this.$route.path
    },

    prev() {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return prev
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next() {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return next
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return false
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
      return false
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  },

  mounted() {
    this.$forceUpdate()
  },

  updated() {
    const { $el: $elContent } = this.$refs.content
    const content = $elContent.innerText
    this.calculateWordAndReadTime(content)
  },

  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo
        return (
          base.replace(endingSlashRE, '') +
          `/src` +
          `/${docsBranch}` +
          (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    },

    calculateWordAndReadTime(content) {
      const $elCounter = this.$refs.counter
      const $elWord = $elCounter.querySelector('#word')
      const $elTime = $elCounter.querySelector('#time')
      const word = wordcount(content)
      const time = min2read(content)
    }
  }
}

function resolvePrev(page, items) {
  return find(page, items, -1)
}

function resolveNext(page, items) {
  return find(page, items, 1)
}

function find(page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...(item.children || []))
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
  .nav
    padding $navbar-vertical-padding $navbar-horizontal-padding
    line-height $navbarHeight - 1.4rem
    position fixed
    z-index 20
    top 0
    left $sidebarWidth
    right 0
    height $navbarHeight
    background-color #fff
    box-sizing border-box
    border-bottom 1px solid $borderColor
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

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    a, ^[0] small.word-count
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .leancloud-visitors
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .pv
      font-weight 400
      color #aaa
      vertical-align 1px

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > span
      display flex
      align-items center
      flex 1
      svg
        margin 0 0.5rem
      a
        color #3C91E6
        font-size 0.9em
        line-height normal
      &.prev
        justify-content flex-start
        a
          text-align left
      &.next
        justify-content flex-end
        a
          text-align right
    .dark-mode &
      border-top 1px solid $borderColorDark

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left
  .page-nav
    .inner
      & > span a
        font-size 0.8em

.word-count
  margin-left .25rem
  vertical-align .1rem
  #word, #time
    margin-right .25rem
</style>
