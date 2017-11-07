<template lang="pug">
div
  .grid_12
    .page-title-bar
      h3#top.grey-col.to_left Semua Kategori

  .grid_12
    .small-link-btn
      a(href="#") Beranda
      span.static-txt &#8250;
      a(href="#") Katalog
      span.static-txt &#8250;
      span.static-txt Semua Kategori

  .index-pagination.grid_12
    ul.index-abz
      li(:class="{disabled: !ab.exists}" v-for="ab in abz") 
        a(:href="'#index-'+ab.label" data-scrollto-link v-if="ab.exists") {{ ab.label }} 
        span(v-else) {{ ab.label }}

  div(v-for="ab in abz" v-if="ab.exists") 
    div(class="grid_12" :id="'index-'+ab.label") {{ ab.label }}
    div(class="grid_4" v-for="cat in cats[ab.label]")
      .kategori-card
        .kat-title {{ cat.name }}
        .kat-title-btn
          span {{ cat.name }}
          span.gr-arrow-down.to_right &nbsp;
        ul.kat-content
          li(v-for="ca in children[cat.id]")
            nuxt-link(:to="'product/category/'+ca.slug") {{ ca.name }}
  
  .grid_12.cleararea3
  .grid_12.cleararea3

</template>

<script>
import axios from '~/plugins/axios'

export default {
  middleware: 'auth',
  async asyncData ({store}) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`
    let { data } = await axios.get('categories')
    let cats = data.data
    return {
      cats: cats
    }
  },
  head () {
    return {
      title: 'Kategori'
    }
  },
  data () {
    return {
      abz: [],
      existsAbc: [],
      parentizeCat: [],
      children: []
    }
  },
  mounted () {
    for (let i = 65; i < 91; i++) {
      this.abz.push({label: String.fromCharCode(i), exists: false})
    }

    for (let i = 0; i < this.cats.length; i++) {
      let cat = this.cats[i]
      if (!this.parentizeCat[cat.parent_id]) {
        this.parentizeCat[cat.parent_id] = []
      }

      this.parentizeCat[cat.parent_id].push(cat)
    }

    if (this.parentizeCat[0]) {
      for (let i = 0; i < this.parentizeCat[0].length; i++) {
        let cat = this.parentizeCat[0][i]
        let fc = cat.name[0].toUpperCase()
        this.existsAbc.push(fc)
        if (!this.cats[fc]) {
          this.cats[fc] = []
        }
        this.cats[fc].push(cat)
      }
    }
    for (let i = 0; i < this.abz.length; i++) {
      if (~this.existsAbc.indexOf(this.abz[i].label)) {
        this.abz[i].exists = true
      }
    }
    this.children = this.parentizeCat
  }
}
</script>

<style lang="css" scoped>
.index-abz > li {
  margin-right: 4px;
}
</style>
