<template lang="pug">
.full-header.red-bg.red-line-btm
    .container
        header.header
            .grid_12
                nuxt-link(to="/")
                  .logobar
                //- if(user.role_id != 1)
                    a(href=app.routeTo('cartList'))
                        .troli-area.to_right
                            .troli-img
                            #my-cart-length.troli-nb.txt-center= MyCart.length
                //- else
                    a(href=app.routeTo('store', {slug: user.store.slug}))
                        .vendor-icon-area.to_right
                            img(src= user.store.logo alt="#")
                .srch
                    form.search-eng(action="")
                        .select-kategori
                            select(name="category" required)
                                option(selected="selected" value="0") Semua Kategori
                        fieldset.main-srch
                            input#s(name="q" type="search" placeholder="Cari Produk atau Kode Produk")
                            button#submitButton
            .grid_12
            
                nav.cd-primary-nav
                    ul
                        //- each val, href in app.config.Menu.header
                            li 
                                a(href=href)= val
                
                //- if user
                    .dropdown.to_right
                        button.user-name.dropbtn= user.name
                    
                        #myDropdown.dropdown-content
                            a(href=app.routeTo('setting')) Pengaturan
                            if(user.role_id != 1)
                                a(href=app.routeTo('transaction')) Histori Transaksi
                            else
                                a(href=app.routeTo('store', {slug: user.store.slug})) Toko Saya
                            a(href=app.routeTo('logout')) Keluar
                
                .cd-secondary-nav
                    button.cd-secondary-nav-trigger(onclick="toggleNav()")
                    #navToggle.navtoggle-content
                        a(href="#") Lorem
                        a(href="#") Ipsum
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      // 
    }
  }
}
</script>

<style lang="css" scoped>

</style>
