<template lang="pug">
footer#footer
    .container
        .menu-footer
            ul
                //- each val, href in app.config.Menu.footbase
                    li
                        a(href=href)= val
    
        p.coright 2017 &copy; Dana Bantuan Non Tunai, Pemerintah Republik Indonesia. ALL Rights Reserved.
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      // 
    }
  }
}
</script>

<style lang="css" scoped>
</style>