<template>
  <div class="profile-page">
      <img src="../assets/userprofile2.png" id="user-profile-photo" alt="user profile">
      <div class="profile-details">
          <h4>{{ username }}</h4>
          <h6 v-if="badge === 'NoBadge' ">No Badge</h6>
          <h6 v-else>{{ badge }}</h6>
          <input  type="file" @click="upload" id="picture" name="picture">
      </div>
  </div>
</template>

<script>
export default {
  name: 'showProfile',
  data () {
    return {
      username: localStorage.getItem('username'),
      badge: localStorage.getItem('badge')
    }
  },
  methods: {
    upload () {
      var inputElement = document.querySelector('input')
      var imgElement = document.querySelector('user-profile-photo')
      inputElement.addEventListener('change', function () {
        var url = URL.createObjectURL(inputElement.files[0])
        imgElement.src = url
        this.profileImage = imgElement.src
      })
    }
  }
}
</script>

<style>
.profile-page {
    box-shadow: 8px 8px 19px 0px rgba(0,0,0,0.75);
    background-color: #f5f4f4;
    width:50vw;
    height:20vh;
    position: absolute;
    padding: 20px;
    margin-left:10px;
    top:10%;
    border-radius: 10px;
}
.profile-details {
    position:absolute;
    left:20%;
    top:24%;
}
#user-profile-photo {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    position: absolute;
    margin-top:10px;
    margin-left:10px;
}
</style>
