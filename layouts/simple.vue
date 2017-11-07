<template lang="pug">
  .wrapper.index-bg
    
    //- header
    .container
        .header-index
    
    //- content
    .container.content-page
        
        nuxt
        
        .grid_12.cleararea3
        .index-menu-footer
            ul
                //- each val, href in app.config.Menu.footer
                    li
                        a(href=href)= val
        
        .grid_12.cleararea3
        .footerarea
    
    //- footer
    #footer
        .container
            .coright 2017 &copy; Dana Bantuan Non Tunai, Pemerintah Republik Indonesia. ALL Rights Reserved.
</template>

<script>
export default {
}
</script>

<style>

</style>
