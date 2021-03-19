<template>
  <div>
    <navbar />
    <table id="table" cellpadding="50px">
        <tr>
        <td class="left-sidebar"><sidebar /></td>
        <td class="middle">
          <div id="pagination-content">
            <div @click="toggleQuestion">
              <askQuestionHome :username="currentUser" />
            </div>
            <div v-show="questionShow" class="question-prompt-container">
              <questionsInputWidget class="question-prompt"/>
            </div>
            <div v-if="pageOfItems.length > 0">
              <div v-for="item in pageOfItems" :key="item.id" class="question-answer-card">
                <headComponentQAHome :username="item.username" />
                <questionComponentHome :question="item.questionText" :src="item.questionImage" :category="item.category" :id="item.questionId" :createdAt="item.createdAt" />
                <div v-if="item.username === currentUser">
                  <button class="d-a-btn" @click="deleteQues" :value="item.questionId">Delete</button>
                </div>
                <!--<answerComponentHome :answer="item.answer" :src="item.asrc" />
                <footComponentQAHome :comments="item.comments" :upvotes="item.upvotes" :downvotes="item.downvotes" :cid="item.qid+''+item.aid" :commentsData="commentsData" />-->
              </div>
            </div>
            <div v-else class="q-a-parent-height-css">
              No Questions Yet.
            </div>
          </div>
          <center class="pagination-placement">
            <jw-pagination :pageSize=5 :items="getAllQuestions" @changePage="onChangePage" :styles="customStyles" :labels="customLabels"></jw-pagination>
          </center>
        </td>
        <td class="right"></td>
        </tr>
    </table>
  </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import sidebar from '@/components/sidebar.vue'
import questionComponentHomeVue from '../components/questionComponentHome.vue'
import answerComponentHome from '../components/answerComponentHome.vue'
import footComponentQAHome from '../components/footComponentQAHome.vue'
import headComponentQAHome from '../components/headComponentQAHome.vue'
import askQuestionHome from '../components/askQuestionHome.vue'
import navbar from '../components/navbar.vue'
import questionsInputWidget from '../components/questionsInputWidget.vue'
const customStyles = {
  ul: {
  },
  li: {
    display: 'inline-block'
  },
  a: {
  }
}
const customLabels = {
  first: '<<',
  last: '>>',
  previous: '<',
  next: '>'
}
export default {
  name: 'home',
  data () {
    return {
      currentUser: localStorage.getItem('username'),
      customStyles,
      customLabels,
      questionShow: false,
      pageOfItems: [],
      images: []
    }
  },
  methods: {
    onChangePage (pageOfItems) {
      this.pageOfItems = pageOfItems
    },
    toggleQuestion () {
      if (this.questionShow) {
        this.questionShow = false
      } else {
        this.questionShow = true
      }
    },
    deleteQues (event) {
      this.$store.dispatch('deleteQuestionAction', event.target.value)
      setTimeout(() => {
        this.$store.dispatch('setGetAllQuestionsAction')
      }, 500)
    }
  },
  components: {
    sidebar: sidebar,
    questionComponentHome: questionComponentHomeVue,
    answerComponentHome: answerComponentHome,
    footComponentQAHome: footComponentQAHome,
    headComponentQAHome: headComponentQAHome,
    askQuestionHome: askQuestionHome,
    navbar: navbar,
    questionsInputWidget: questionsInputWidget
  },
  computed: {
    ...mapGetters(['getAllQuestions', 'getQuestionImages'])
  },
  created () {
    this.$store.dispatch('setGetAllQuestionsAction')
    this.$store.dispatch('setGetUserCategoriesAction', localStorage.getItem('username'))
    const axiosConfig = {
      method: 'get',
      baseURL: 'http://10.177.68.69:808/',
      url: `/quac/notification/${localStorage.getItem('username')}/count`,
      headers:{
        Authorization: localStorage.getItem('sessionId')
      }
    }
    axios(axiosConfig)
      .then(e => {
        localStorage.setItem('notificationCount', e.data)
        console.log(localStorage.getItem('notificaionCount'))
      })
      .catch(e => console.log(e.data))
    const axiosConfig1 = {
      method: 'get',
      baseURL: 'http://10.177.68.69:808/',
      url: `/details/badge/${localStorage.getItem('username')}`,
      headers:{
        Authorization: localStorage.getItem('sessionId')
      }
    }
    axios(axiosConfig1)
      .then(e => localStorage.setItem('badge', e.data.ranking))
      .catch(e => console.log(e))
    if (localStorage.getItem('sessionId') === null) {
      this.$router.push('/login')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
    #table{
      width: 100%;
      margin-top: 100px;
    }
    .left-sidebar{
      width: 25%;
      top: 100px;
      height: 200px;
      overflow: scroll;
    }
    .middle{
      width: 50%;
    }
    .right{
      width: 25%;
    }
    table td, table td * {
      vertical-align: top;
    }
    .question-answer-card{
      margin-bottom: 30px;
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 10px;
    }
    .pagination-placement{
      margin-bottom: 100px;
    }
    .question-prompt-container{
      padding-top: 10px;
      border: 1px solid whitesmoke;
      margin-bottom: 40px;
      margin-top: -15px;
      border-radius: 10px;
    }
    .q-a-parent-height-css{
      width: 100%;
      padding: 20px;
      border: 1px solid lightgray;
      border-radius: 10px;
      margin-bottom: 20px;
      text-align: center;
    }
    .d-a-btn{
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      appearance: none;
      border: 1px solid #4ca7ff;
      background: white;
      border-radius: 5px;
      margin-bottom: 10px;
      margin-left: 10px;
      color: #4ca7ff;
      cursor: pointer;
    }
    .d-a-btn:focus{
      outline: none;
    }
    .d-a-btn:hover{
      background-color: #4ca7ff;
      color: white;
    }
</style>
