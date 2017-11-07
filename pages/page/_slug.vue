<template lang="pug">
div
  .grid_12
      .page-title-bar
          h3.grey-col.to_left {{ page.title }}
      
  .grid_12
      .small-link-btn
          a(href="/") Beranda
          span.static-txt &#8250;
          a(href="/") Katalog
          span.static-txt &#8250;
          span.static-txt {{ page.title }}
  
  .content-area
      .grid_12
          .static-content(v-html="page.content") 

</template>

<script>
export default {
  data () {
    return {
      page: {
        title: 'Privacy',
        content: '<h1> privacy </h1>'
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>