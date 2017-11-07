<template lang="pug">
div.content-area
  .gutter-md(v-for="product in items")
    .item-area
      .span10.gutt-right
        .kode-produk
          nuxt-link(:to="'/product/' + product.slug") {{ product.code }}
        .nama-produk
          nuxt-link(:to="'/product/' + product.slug") {{ product.name }}
        .harga-produk
          span Rp. {{ product.price.toLocaleString('id-IN') }}
        .stok-produk
          span.static-txt stok:
          span.not-ava(v-if="product.min_order > product.stock") Kosong
          span.ava(v-else) Tersedia
      .span10.vendor-detail.gutt-right
        nuxt-link(:to="'store'+ product.store.slug") {{ product.store.name }}
        nuxt-link(class="vendor-location" to="#") {{ product.store.city.name }}
        a.show-img.special-link(href="#modal-img" data-img="product.image_uri_large" v-if="product.image_uri_large") Lihat Gambar
        .grid_2.fl-abs
          //- a.buy-this(href="#modal" data-product=`{
          //-     "id"    : "${product.id}",
          //-     "code"  : "${product.code}",
          //-     "name"  : "${product.name}",
          //-     "min"   : ${product.min_order},
          //-     "stock" : ${product.stock},
          //-     "unit"  : "${product.attributes.unit}",
          //-     "price" : ${product.price}
          //- }`)
          button.frc-width.btn-red.to_right(type="button") Beli
        //- check if product in cart
        .notif-troli(v-if="false") Sudah ada dalam troli
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // 
    }
  }
}
</script>

<style lang="css" scoped>
</style>
