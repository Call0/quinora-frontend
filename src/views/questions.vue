<template>
  <div>
    <navbar/>
    <table class="q-table" cellpadding="40px">
        <tr>
            <td class="q-left">
              <div class="q-combine">
                <div class="q-container-head">
                  Questions for You
                </div>
                <div v-for="item in response" :key="item.id" class="q-container">
                  <questionComponentHome :question="item.question" :src="item.src" />
                  <button class="a-btn" @click="toggleInput" :value="item.qid">Answer</button>
                  <inputWidget :id="item.qid" :cid="item.id" class="q-initial-style"/>
                </div>
                <hr>
              </div>
            </td>
            <td class="q-right">
              <div class="q-right-content">
                <span class="q-similar-ques-head"> Similar Questions </span>
                <div v-for="item in similar" :key="item.id" class="q-similar-ques-content">
                  {{ item.question }}
                </div>
              </div>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import inputWidget from '../components/inputWidget.vue'
import navbar from '../components/navbar.vue'
import questionComponentHome from '../components/questionComponentHome.vue'
export default {
  name: 'questions',
  data () {
    return {
      similar: [
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        },
        {
          question: 'Wassup, How\'s the project going?'
        }
      ],
      response: [
        {
          qid: 1,
          question: 'What is this?',
          src: ''
        },
        {
          qid: 2,
          question: 'What is this?',
          src: ''
        },
        {
          qid: 3,
          question: 'What is this?',
          src: ''
        }
      ]
    }
  },
  methods: {
    toggleInput (event) {
      var visibility = document.getElementById(event.target.value).style.display
      console.log(event.target.value)
      if (visibility === 'block') {
        document.getElementById(event.target.value).style.display = 'none'
      } else {
        document.getElementById(event.target.value).style.display = 'block'
      }
      console.log(document.getElementById(event.target.value).innerText)
    }
  },
  components: {
    questionComponentHome: questionComponentHome,
    inputWidget: inputWidget,
    navbar: navbar
  },
  created () {
    /*
    if (localStorage.getItem('sessionId') === null) {
      this.$router.push('/login')
    }
    */
  }
}
</script>

<style scoped>
    *{
      outline: none;
    }
    body{
      outline: none;
    }
    .q-table{
      width: 100%;
      margin-top: 100px;
    }
    .q-left{
      width: 60%;
      padding-left: 10%;
    }
    .q-right{
      width: 40%;
    }
    .q-container{
      margin: 20px;
      border: 1px solid whitesmoke;
      border-radius: 5px;
    }
    .q-container-head{
      margin-left: 20px;
      margin-right: 20px;
      padding: 10px;
      border: 1px solid whitesmoke;
      border-radius: 10px;
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
    .q-combine{
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 5px;
      margin-bottom: 100px;
    }
    .q-initial-style{
      display: none;
    }
    table td, table td * {
      vertical-align: top;
    }
    .q-similar-ques-content{
      line-height: 2;
      color: #4ca7ff;
      cursor: pointer;
    }
    .q-similar-ques-head{
      font-size: 24px;
      line-height: 2;
      color: gray;
    }
</style>
