<template>
  <section v-if="this.$page.frontmatter.noComment !== true" class="content">
    <div class="warning custom-block">
      <p class="custom-block-title">
        关于评论
      </p>
      <p>评论前请填好“昵称”、“邮箱”这两栏内容，否则不会收到回复，谢谢！</p>
    </div>
    <article id="vcomments" />
  </section>
</template>

<script>
export default {
  props: ['options'],
  watch: {
    '$page.key'(val, old) {
      // 评论区防抖
      if (!val || old === val) {
        return
      }
      // 在页面变化时刷新评论区
      this.initialize(this.options)
    }
  },

  mounted() {
    this.initialize(this.options)
  },

  methods: {
    initialize(userOptions) {
      Promise.all([
        // import(/* webpackChunkName: "valine" */ 'valine'),
        // import(/* webpackChunkName: "leancloud-storage" */ 'leancloud-storage/dist/av')
      ]).then(([{ default: Valine }, { default: AV }]) => {
        if (window) {
          window.AV = AV
        }
        // eslint-disable-next-line
        new Valine(
          Object.assign(
            {
              el: '#vcomments',
              path: this.$page.path,
              visitor: true,
              verify: false
            },
            typeof window.AV !== 'undefined' ? { av: AV } : {},
            { ...userOptions }
          )
        )
      })
    }
  }
}
</script>
