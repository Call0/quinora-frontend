<template>
  <div>
    <navbar />
    <div class="s-b-u-parent">
      <div class="s-b-u-container">
        Search Results
      </div>
      <div class="hardcode-width-css">
        <div v-for="item in getSearchByUserList" :key="item.id" class="s-b-q-question-answer-card">
          <userComponentSearch :userId="item.userId" :username="item.username" :firstname="item.firstname" :lastname="item.lastname" :city="item.city" :country="item.country" :profession="item.profession" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import navbar from '../components/navbar.vue'
import userComponentSearch from '../components/userComponentSearch.vue'
export default {
  name: 'searchByUser',
  components: {
    navbar: navbar,
    userComponentSearch: userComponentSearch
  },
  computed: {
    ...mapGetters(['getSearchByUserList'])
  },
  created () {
    this.$store.dispatch('searchByUserAction', localStorage.getItem('searchTerm'))
    if (localStorage.getItem('sessionId') === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .s-b-u-parent{
    margin-left: 300px;
  }
  .s-b-u-container{
    width: 700px;
    margin-top: 100px;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .s-b-u-question-answer-card{
    width: 700px;
    margin-bottom: 30px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .hardcode-width-css{
    width: 700px;
  }
</style>
