<template>
  <div>
    <navbar />
    <div class="s-b-q-parent">
      <div class="s-b-q-container">
        Search Results
      </div>
      <div>
        <div v-for="item in getSearchByQuestionList" :key="item.id" class="s-b-q-question-answer-card">
          <headComponentQAHome :username="item.username" />
          <questionComponentSearch :question="item.questionText" :category="item.category" :src="item.questionImage" :id="item.questionId" :createdAt="item.createdAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import navbar from '../components/navbar.vue'
import headComponentQAHome from '../components/headComponentQAHome.vue'
import questionComponentSearch from '../components/questionComponentSearch.vue'
export default {
  name: 'searchByQuestion',
  components: {
    navbar: navbar,
    headComponentQAHome: headComponentQAHome,
    questionComponentSearch: questionComponentSearch
  },
  computed: {
    ...mapGetters(['getSearchByQuestionList'])
  },
  created () {
    this.$store.dispatch('searchByQuestionAction', localStorage.getItem('searchTerm'))
    if (localStorage.getItem('sessionId') === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .s-b-q-parent{
    margin-left: 300px;
  }
  .s-b-q-container{
    width: 700px;
    margin-top: 100px;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .s-b-q-question-answer-card{
    width: 700px;
    margin-bottom: 30px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
</style>
