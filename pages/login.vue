<template lang="pug">
div
    .form-login(method="POST")
        h2.form-title.txt-center Form Login
        p.font-md.txt-center Selamat datang di Dana Bantuan Non Tunai<br>Pemerintah Republik Indonesia, silahkan login
        
        form#user-login(method="POST" @submit.prevent="onSubmit")
            
            .alert(v-show="isError") {{ errorMessage }}
            
            label(for="username") Username
            input.placeholder(type="text" id="username" name="username" placeholder="Nama Akun" required="required" autofocus="autofocus" value="username" v-model="username")
            .alert
            
            label(for="password") Password
            input.placeholder(type="password" id="password" name="password" placeholder="Kata Sandi" required="required" v-model="password")
            .alert
            
            button.btn-red.large Login
            
        //- .reg-here.font-sm
            //- span Belum punya akun? Klik untuk 
            //- a.text-medium(href="/register") Registrasi
    
    .grid_12.txt-center.form-link
        nuxt-link(to="/page/help") Butuh bantuan?
</template>

<script>
export default {
  layout: 'simple',
  data () {
    return {
      username: '',
      password: '',
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
        this.username = ''
        this.password = ''
        this.errorMessage = null
        this.$router.replace('/')
      } catch (e) {
        this.isError = true
        this.errorMessage = e.message
      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
