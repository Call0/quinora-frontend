<template>
  <div>
    <navbar />
    <div class="margin-top-parent">
        <table class="table-parent">
            <tr>
                <td class='left'>
                </td>
                <td class='middle'>
                  <div class="inside-middle">
                    <headComponentQAHome :username="getParticularQuestion.username" />
                    <questionComponentHome :question="getParticularQuestion.questionText" :category="getParticularQuestion.category" :src="getParticularQuestion.questionImage" :id="getParticularQuestion.q" :createdAt="getParticularQuestion.createdAt" />
                    <button class="a-btn" @click="toggleInput" :value="getParticularQuestion.questionId">Answer</button>
                    <inputWidget :id="getParticularQuestion.questionId" :cid="getParticularQuestion.questionId" class="q-initial-style"/>
                  </div>
                </td>
                <td class='right'>
                </td>
            </tr>
            <tr>
                <td class='left'>
                </td>
                <td class='middle'>
                    <select v-model="ansfilter" class="answer-filter" id="answer-filter" @change="sortAnswer">
                      <option value="byNew">Sort By Latest</option>
                      <option value="byLikes">Sort By Likes</option>
                      <option value="byDislikes">Sort By Dislikes</option>
                    </select>
                    <div v-if="getQuestionAnswerData.length > 0">
                      <div v-for="item in pageOfItems" :key="item.id">
                          <div class="q-a-parent">
                              <headComponentAnswer :username="item.userName.substring(0,1).toUpperCase() + '' + item.userName.substring(1,item.userName.length)" />
                              <answerComponentHome :answer="item.answerText.substring(0,1).toUpperCase() + '' + item.answerText.substring(1,item.answerText.length)" :src="item.imgsrc" />
                              <footComponentQAHome :comments="item.commentList.length" :upvotes="item.likes" :downvotes="item.dislikes" :cid="item.questionID+''+item.id" :commentsData="item.commentList" :answerId="item.id" />
                              <div v-if="item.userName === currentUser">
                                <button class="a-btn" @click="deleteAns(item.id, item.questionID)">Delete</button>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div v-else class="q-a-parent-height">
                      No Answers Yet.
                    </div>
                    <center class="pagination-placement">
                      <jw-pagination :pageSize=5 :items="getQuestionAnswerData" @changePage="onChangePage" :styles="customStyles" :labels="customLabels"></jw-pagination>
                    </center>
                </td>
                <td class="right">
                </td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import inputWidget from '../components/inputWidget.vue'
import { mapGetters } from 'vuex'
import navbar from '../components/navbar.vue'
import headComponentQAHome from '../components/headComponentQAHome.vue'
import headComponentAnswer from '../components/headComponentAnswer.vue'
import answerComponentHome from '../components/answerComponentHome.vue'
import footComponentQAHome from '../components/footComponentQAHome.vue'
import questionComponentHome from '../components/questionComponentHome.vue'
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
  name: 'questionAnswer',
  data () {
    return {
      currentUser: localStorage.getItem('username'),
      qText: '',
      qTitle: '',
      ansfilter: 'byNew',
      pageOfItems: [],
      customStyles,
      customLabels
    }
  },
  computed: {
    ...mapGetters(['getQuestionAnswerData', 'getParticularQuestion'])
  },
  methods: {
    onChangePage (pageOfItems) {
      this.pageOfItems = pageOfItems
    },
    sortAnswer () {
      var filter = document.getElementById('answer-filter').value
      if (filter === 'byNew') {
        this.$store.dispatch('setQuestionAnswerRequestDataAction', localStorage.getItem('questionId'))
      } else if (filter === 'byLikes') {
        this.$store.dispatch('setQuestionAnswerRequestDataByLikesAction', localStorage.getItem('questionId'))
      } else if (filter === 'byDislikes') {
        this.$store.dispatch('setQuestionAnswerRequestDataByDislikesAction', localStorage.getItem('questionId'))
      }
    },
    toggleInput (event) {
      var visibility = document.getElementById(event.target.value).style.display
      console.log(event.target.value)
      if (visibility === 'block') {
        document.getElementById(event.target.value).style.display = 'none'
      } else {
        document.getElementById(event.target.value).style.display = 'block'
      }
      console.log(document.getElementById(event.target.value).innerText)
    },
    deleteAns (id, questionID) {
      const obj = {
        qid: questionID,
        ansid: id
      }
      this.$store.dispatch('deleteAnswerAction', obj)
      setTimeout(() => {
        this.$store.dispatch('setQuestionAnswerRequestDataAction', obj.qid)
        this.$store.dispatch('setGetParticularQuestionAction', obj.qid)
      }, 500)
    }
  },
  created () {
    this.$store.dispatch('setGetParticularQuestionAction', localStorage.getItem('questionId'))
    setTimeout(() => {
      if (this.getParticularQuestion.username === localStorage.getItem('username')) {
        this.ansfilter = 'byNew'
        this.$store.dispatch('setQuestionAnswerRequestDataAction', localStorage.getItem('questionId'))
      } else {
        this.ansfilter = 'byLikes'
        this.$store.dispatch('setQuestionAnswerRequestDataByLikesAction', localStorage.getItem('questionId'))
      }
      if (localStorage.getItem('sessionId') === null) {
        this.$router.push('/login')
      }
    }, 500)
  },
  components: {
    headComponentAnswer: headComponentAnswer,
    answerComponentHome: answerComponentHome,
    footComponentQAHome: footComponentQAHome,
    questionComponentHome: questionComponentHome,
    navbar: navbar,
    inputWidget: inputWidget,
    headComponentQAHome: headComponentQAHome
  }
}
</script>

<style>
    .q-a-head{
      margin-left: 10px;
    }
    .margin-top-parent{
      margin-top: 100px;
    }
    .table-parent{
      width: 100%;
    }
    .q-a-parent{
      width: 100%;
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 10px;
      margin: 10px;
      margin-bottom: 20px;
    }
    .q-a-parent-height{
      width: 100%;
      padding: 20px;
      border: 1px solid lightgray;
      border-radius: 10px;
      margin: 10px;
      margin-bottom: 20px;
      text-align: center;
    }
    .left{
      width: 20%
    }
    .inside-middle{
      border: 1px solid lightgray;
      margin-left: 10px;
      margin-right: -10px;
      padding: 10px;
      border-radius: 10px;
      background-color: whitesmoke;
    }
    .middle{
      width: 490px;
    }
    .right{
      width: 35%;
    }
    .q-initial-style{
      display: none;
    }
    .a-btn{
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
    .a-btn:focus{
      outline: none;
    }
    .a-btn:hover{
      background-color: #4ca7ff;
      color: white;
    }
    .answer-filter{
      margin: 10px;
      margin-top: 20px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid lightgray
    }
    .pagination-placement{
      margin-bottom: 100px;
    }
</style>
