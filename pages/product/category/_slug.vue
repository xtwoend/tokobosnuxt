<template lang="pug">
div
  .grid_12
    .page-title-bar
      h3.grey-col.to_left {{ category.name }}
        
  .grid_12
    .small-link-btn
      nuxt-link(to="/") Beranda
      span.static-txt &#8250;
      nuxt-link(to="/") Katalog
      span.static-txt &#8250;
      span.static-txt {{ category.name }}

  .grid_12.content-area
    #search-result-info.main-p
    .widget.to_right
      .widget-title.font-sm.filter Urutkan :
        select.select-filter(@change="sortBy" v-model="sorter")
          option(:value="{sort: 'location', sortdir: 'asc'}") Terdekat
          option(:value="{sort: 'price', sortdir: 'asc' }") Termurah
          option(:value="{sort: 'price', sortdir: 'desc' }") Termahal
    
  .grid_12
    product-list(:items="products")
</template>

<script>
import axios from '~/plugins/axios'
import ProductList from '~/components/product/list'

let fetchProducts = async (page, query, token = null) => {
  query.page = page
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  let { data } = await axios.get('products', {
    params: query
  })
  return {
    products: data.data,
    total: data.meta.total
  }
}

export default {
  middleware: 'auth',
  components: {
    'product-list': ProductList
  },
  async asyncData ({params, store, query}) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`
    let { data } = await axios.get(`categories/${params.slug}`)
    return {
      category: data.data,
      defaultQuery: query
    }
  },
  data () {
    return {
      products: [],
      query: {
        category: 0,
        city: 'tangerang',
        rpp: 10,
        sort: 'location',
        sortdir: 'asc'
      },
      sorter: {},
      total: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.query = this.defaultQuery
    this.sorter = {
      sort: this.query.sort ? this.query.sort : 'location',
      sortdir: this.query.sortdir ? this.query.sortdir : 'asc'
    }
    this.query.category = this.category.id
    this.fetchData(this.query)
  },
  methods: {
    sortBy () {
      this.query.sort = this.sorter.sort
      this.query.sortdir = this.sorter.sortdir
      this.$router.push({
        path: '?',
        query: this.query
      })
      this.fetchData(this.query)
    },
    async fetchData (query) {
      let res = await fetchProducts(this.currentPage, query, this.$store.state.token)
      this.products = res.products
      this.total = res.total
    }
  }
}
</script>

<style lang="css" scoped>
</style>
