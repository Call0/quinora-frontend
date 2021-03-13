<template>
  <div class="conatiner">
    <div class="hardcoded-text">
        Answer . Recommended for you
    </div>
    <span>Answered by:<span style="cursor: pointer" v-if="currentUser !== username" @click="goToProfile(username)"><b> {{ username.substring(0,1).toUpperCase() + '' + username.substring(1,username.length) }}</b></span>
    <router-link v-else to="/profilepage"><b> {{ username.substring(0,1).toUpperCase() + '' + username.substring(1,username.length) }}</b></router-link></span>
  </div>
</template>

<script>
export default {
  name: 'headComponentQAHome',
  data () {
    return {
      currentUser: localStorage.getItem('username')
    }
  },
  methods: {
    goToProfile (username) {
      localStorage.setItem('goToUsername', username)
      this.$router.push('/newUserProfile')
    }
  },
  props: {
    username: String
  }
}
</script>

<style scoped>
    .conatiner{
        padding: 10px;
        border: 1px solid whitesmoke;
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .hardcoded-text{
        font-size: 12px;
        margin-bottom: 5px;
        color: lightgray
    }
    a{
      text-decoration: none;
      color: black
    }
</style>
