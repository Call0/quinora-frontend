<template>
  <div class="conatiner">
    <i class="fa fa-thumbs-up upvote-placement" @click="reactionLike"><span class="remove-pointer"> {{ upvotes }}</span></i>
    <i class="fa fa-thumbs-down downvote-placement" @click="reactionDislike"><span class="remove-pointer"> {{ downvotes }} </span></i>
    <span class="remove-pointer comments-placement"> {{ comments }} </span><button class="fa fa-comments comments-placement" @click="toggleComments" :value="cid"></button>
    <div v-show="listCommentsShow">
      <commentsInputWidget :id="cid" class="show-comments" :answerId="answerId" />
      <commentComponentHome :commentsData="commentsData" />
    </div>
  </div>
</template>

<script>
import commentsInputWidget from './commentsInputWidget.vue'
import commentComponentHome from '../components/commentComponentHome.vue'
export default {
  name: 'footComponentQAHome',
  components: {
    commentsInputWidget: commentsInputWidget,
    commentComponentHome: commentComponentHome
  },
  data () {
    return {
      listCommentsShow: false
    }
  },
  props: {
    upvotes: Number,
    downvotes: Number,
    comments: Number,
    cid: String,
    answerId: Number,
    commentsData: Array
  },
  methods: {
    toggleComments (event) {
      if (this.listCommentsShow) {
        this.listCommentsShow = false
      } else {
        this.listCommentsShow = true
      }
    },
    reactionLike () {
      const obj = {
        answerId: this.answerId,
        isLiked: true
      }
      this.$store.dispatch('setLikeAction', obj)
      setTimeout(() => {
        this.$store.dispatch('setQuestionAnswerRequestDataAction', localStorage.getItem('questionId'))
      }, 500)
    },
    reactionDislike () {
      const obj = {
        answerId: this.answerId,
        isLiked: false
      }
      this.$store.dispatch('setDislikeAction', obj)
      setTimeout(() => {
        this.$store.dispatch('setQuestionAnswerRequestDataAction', localStorage.getItem('questionId'))
      }, 500)
    }
  }
}
</script>

<style scoped>
    .conatiner{
        padding: 10px;
        border: 1px solid whitesmoke;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .upvote-placement{
        cursor: pointer;
    }
    .downvote-placement{
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
    }
    .comments-placement{
        float: right;
        cursor: pointer;
        appearance: none;
        background-color: white;
        border: none;
    }
    .comments-placement:focus{
        outline: none;
    }
    .comments-placement:hover{
        outline: none;
    }
    .remove-pointer{
        cursor: auto;
    }
    .show-comments{
      margin-top: 10px;
      margin-left: -10px;
      margin-right: -10px;
    }
</style>
