<template>
    <div id="back-container">
      <div>
        <div id ="container-box">
          <p class="vericaltext">
            Quinora
          </p>
          <div id="login-box">
          <center>
          <label>Login</label>
          </center>
          <hr>
          <div class="place-whole-css">
            <label id="tags1"> Username </label><br>
            <input type = "text" v-model='loginUsername'>
            <label id="tags2"> Password </label><br>
            <input type="password" v-model="loginPassword">
            <center>
            <button id = "login-btn" @click='login'> Login</button>
            </center>
          </div>
          </div>
          <div id="left-box">
          <center>
          <label>Sign up</label>
          </center>
          <hr>
          <label id="tags1"> Username </label><br>
          <input type = "text" v-model="username">
          <label id="tags2"> Password </label><br>
          <input type="password"  v-model="password">
          <label id="tags3"> Email </label><br>
          <input type="email" v-model="email">
          <center>
          <button id ="signUp-btn" @click="signup"> Sign up</button>
          </center>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      loginUsername: '',
      loginPassword: ''
    }
  },
  created () {
    if (localStorage.getItem('sessionId') !== null) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      this.$store.dispatch('setLoginAction', {
        username: this.loginUsername,
        password: this.loginPassword
      })
      localStorage.setItem('username', this.loginUsername)
      this.loginUsername = ''
      this.loginPassword = ''
    },
    signup () {
      this.$store.dispatch('setSignUpAction', {
        username: this.username,
        password: this.password
      })
      localStorage.setItem('email', this.email)
      localStorage.setItem('username', this.username)
      this.username = ''
      this.password = ''
      this.email = ''
    }
  }
}
</script>

<style scoped>

hr{
    margin-bottom: 30px;
}

#back-container{
  width: 100%;
  background: url('../assets/MicrosoftTeams-image.png') !important;
  height: 100vh;
  padding-top: 10px;
}

.vericaltext{
    width:1px;
    word-wrap: break-word;
    font-family: monospace; /* this is just for good looks */
    float:left;
    width:10px;
    margin-right:100px;
    margin-top: 170px;
    font-size: 50px;
    line-height: 1.2;
    color: rgb(37, 150, 187);
    text-shadow: 0.5px 1px rgb(16, 233, 16);
}

#container-box{
    box-sizing: border-box;
    display:block;
    height: 780px;
    margin-right: 200px;
    margin-left: 200px;
    padding-left:100px;
    background-color: white;
}

#login-box{
    margin-right: 220px;
    float: right;
    height: 500px;
    margin-top: 150px;
    border-left:darkgray solid 1px;
    padding-left: 50px;
}

#left-box{
    float:left;
    margin-top: 150px;
    margin-right: 50px;
    margin-left: 50px;
    height: 500px;
}

input{
    display: block;
    border:darkgray solid 1px;
    border-radius: 2px;
    height:30px;
    margin:20px;
    width:250px;
}

#tags1{
    font-weight: bold;
    margin-left: 20px;
}

#tags2{
    font-weight: bold;
    margin-left: 20px;
}

#tags3{
    font-weight: bold;
    margin-left: 20px;
}

#login-btn{
    margin-top: 50px;
    height:35px;
    width:100px;
    background-color: white;
    color: rgb(37, 150, 187);
    border: rgb(37, 150, 187) solid 1px;
    border-radius: 5px;
}

#signUp-btn{
    margin-top:50px;
    height:35px;
    width:100px;
    background-color: white;
    color: rgb(37, 150, 187);
    border: rgb(37, 150, 187) solid 1px;
    border-radius: 5px;
}

#login-btn:hover{
    border:  rgb(16, 233, 16) solid 1px;
    cursor: pointer;
}

#signUp-btn:hover{
    border:  rgb(16, 233, 16) solid 1px;
    cursor: pointer;
}
.place-whole-css{
  display: inline
}
</style>
