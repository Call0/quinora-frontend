<template>
  <div class="conatiner">
    <div class="hardcoded-text">
        Question . Recommended for you
    </div>
    <span>Asked by:<b> <router-link v-if="currentUser === username" to='/profilepage'> {{ username.substring(0,1).toUpperCase() + '' + username.substring(1,username.length) }} </router-link>
    <span style="cursor: pointer" v-else @click='goToProfile(username)'> {{ username.substring(0,1).toUpperCase() + '' + username.substring(1,username.length) }} </span></b></span>
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
      console.log(username)
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
    a {
      text-decoration: none;
      color: black;
    }
</style>
