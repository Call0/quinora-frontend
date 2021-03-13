<template>
  <div class = "nav">
      <ul>
          <img style="margin-right:20px;" id="logo" src="../assets/Quinora.png" />
          <li><router-link to="/"><img src="../assets/home (1).png"/></router-link></li>
          <li><img src="../assets/newspaper.png"/></li>
          <li><img src="../assets/browser.png"/></li>
          <li><img src="../assets/users.png"/></li>
          <li><router-link to="/notification"><img src="../assets/alarm.png" class="parent-img-not">
          <span v-if="notCount > 0" class="child-text-not"><span class='not-count-css'>{{ notCount }}</span></span></router-link></li>
      </ul>
      <select name="filter" id="filter" v-model="filterType">
          <option value=null>Select Filter</option>
          <option value="question">Question</option>
          <option value="user">User</option>
      </select>
      <input type="text" :name="searchTerm" v-model="searchTerm" placeholder="Search...">
      <button type="submit" @click="onSearch" id="searchButton">Search</button>
      <!--<img src="../assets/user.png" id="profile">
      <img src="../assets/more.png" id="more" @click="onClickMenu()" alt="">-->

      <div class="p-action">
          <div class="profile" @click="menuToggle()">
              <img src="../assets/profile.png">
          </div>
          <div class="menu">
              <div class="p-profile">
                  <router-link to="/profilePage"><img src="../assets/profile.png"></router-link>
              </div>
              <router-link to="/profilePage"><h3>{{ userName }}</h3></router-link>
              <ul>
                  <li @click="onLogout"><img src="../assets/logout.png">Logout</li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'navbar',
  data () {
    return {
      searchTerm: '',
      filterType: localStorage.getItem('filterType'),
      userName: localStorage.getItem('username'),
      notCount: localStorage.getItem('notificationCount')
    }
  },
  methods: {
    onLogout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    menuToggle () {
      const toggleMenu = document.querySelector('.menu')
      toggleMenu.classList.toggle('active')
    },
    onSearch () {
      if (this.filterType === 'question') {
        localStorage.setItem('searchTerm', this.searchTerm)
        localStorage.setItem('filterType', 'question')
        this.$store.dispatch('searchByQuestionAction', this.searchTerm)
      } else if (this.filterType === 'answer') {
        localStorage.setItem('searchTerm', this.searchTerm)
        localStorage.setItem('filterType', 'answer')
        this.$store.dispatch('searchByAnswerAction', this.searchTerm)
      } else if (this.filterType === 'user') {
        localStorage.setItem('searchTerm', this.searchTerm)
        localStorage.setItem('filterType', 'user')
        this.$store.dispatch('searchByUserAction', this.searchTerm)
      }
    }
  }
}
</script>
<style scoped>
    input[type=text] {
        width:350px;
        position: absolute;
        padding: 6px;
        border: none;
        margin-top: 10px;
        margin-bottom: 5px;
        border:2px solid #F1F2F2;
        left:40%;
        border-radius: 20px;
    }
    #searchButton {
        position: absolute;
        left: 65%;
        margin-top:12px;
        margin-bottom:5px;
        padding: 5px;
        border:none;
        background-color:#ce4745;
        width: 70px;
        border-radius: 30px;
        cursor: pointer;
        color:white;
    }
    #filter {
        position: absolute;
        left:33%;
        margin-top:15px;
        margin-bottom:5px;
        margin-left: -20px;
        padding: 4px 10px;
        border:1px solid #F1F2F2;
        border-radius: 20px;
        cursor: pointer;
    }
    .nav {
        background-color: #FFFFFF;
        box-shadow: 0 8px 6px -6px #999;
        top: 0px;
        height: 60px;
        position: fixed;
        width: 100vw;
        display: flex;
        flex-direction: row;
        z-index: 100;
    }
    #logo {
        width: 100px;
        height: 60px;
    }
    #profile {
        width:30px;
        height:25px;
        position: absolute;
        right:10%;
        margin-top:14px;
    }
    #more {
        width:30px;
        height:25px;
        position: absolute;
        right:7%;
        cursor: pointer;
        margin-top:14px;
    }
    ul {
        width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    li {
        display: block;
        padding: 10px;
        color:#808080;
    }
    li:hover {
        background-color:#F1F2F2 ;
    }
    li {
        cursor: pointer;
    }
    img {
        width:30px;
        height: 25px;
    }
    .p-action
    {
        position: fixed;
        top: 20px;
        right: 200px;
        cursor: pointer
    }
    .p-action .p-profile
    {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    }
    .p-action .p-profile img
    {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
    .p-action .menu
    {
        position: absolute;
        top: 60px;
        right: -10px;
        padding: 10px 20px;
        background: #fff;
        width: 200px;
        border-radius: 15px;
        transition: 0.5s;
        border: 1px solid;
        display: none
    }
    .p-action .menu.active
    {
        top: 50px;
        visibility: visible;
        display: block;
        opacity: 1;
    }
    .p-action .menu h3
    {
        width: 100%;
        padding: 20px 0;
        font-weight: 500;
        font-size: 15px;
        color: #555;
    }
    .p-action .menu ul li a
    {
        display: inline-block;
        color: #555;
        transition: 0.5s;
    }
    .p-action .menu ul li:hover a
    {
        color: #ff5d94;
    }
    .parent-img-not{
        position: relative;
    }
    .child-text-not{
        display: flex;
        position: absolute;
        margin-top: -30px;
        margin-left: 10px;
        width: 20px;
        height: 20px;
        background-color: white;
        border: 3px solid #ce4745;
        border-radius: 50%;
        color: #ce4745;
        padding: 5px;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 10px;
    }
</style>
