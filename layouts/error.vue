<template lang="pug">
div
    .grid_12.content-page
        .span9.err-img
            img(src="~assets/img/elements/404.png" alt="Error 404")
    
    .grid_12.txt-center.form-link
        .font-lg.text-bold.gutt-bottom {{ error.message }}
        .gutt-bottom
            nuxt-link(to="/") Kembali ke depan
</template>
<script>
export default {
  props: ['error'],
  layout: 'simple'
}
</script>
