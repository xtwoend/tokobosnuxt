<template lang="pug">
  .wrapper

        //- include /shared/complex-header.pug
        complex-header

        .body-container
            .container.content-page
            
                nuxt
                
                .grid_12.cleararea3
                .footerarea
        complex-footer
        //- include /shared/complex-footer.pug
</template>

<script>
import Footer from '~/components/common/footer'
import Header from '~/components/common/header'
export default {
  components: {
    'complex-header': Header,
    'complex-footer': Footer
  }
}
</script>
