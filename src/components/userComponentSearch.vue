<template>
  <div>
    <div class="u-c-s-question-answer-card">
        <div class="u-c-s-conatiner">
            <table>
                <tr>
                    <td rowspan="4" class="u-c-s-left"><img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" class="u-c-s-image" alt=""></td>
                    <td> <span style="cursor: pointer" @click="takeToProfile(username)">{{ username }}</span><br>{{ firstName }} {{ lastname }}<br>{{ profession }}<br>{{ city }}, {{ country }}</td>
                </tr>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userComponentSearch',
  data () {
    return {
      id: this.userId
    }
  },
  props: {
    username: String,
    firstname: String,
    lastname: String,
    profession: String,
    city: String,
    country: String,
    userId: Number
  },
  methods: {
    takeToProfile (username) {
      localStorage.setItem('goToUsername', username)
      this.$router.push('/newUserProfile')
    }
  }
}
</script>

<style scoped>
  .u-c-s-conatiner{
    padding: 10px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .u-c-s-parent-height-css{
    width: 100%;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin: 10px;
    margin-bottom: 20px;
    text-align: center;
  }

  .u-c-s-question-answer-card{
    margin-bottom: 30px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .u-c-s-left {
    width: 40%;
  }
  .u-c-s-image {
    width: 170px;
    height: 200px;
  }
</style>
