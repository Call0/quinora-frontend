<template>
  <div>
      <div class="i-div-post-top">
        <label for="i-div-img">
          <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" class="image-upload-icon-css">
        </label>
        <input type="file" class="i-div-img" accept="image/*" @change="previewImage">
      </div>
      <div class="i-div-image-preview" v-if="imageData.length > 0">
        <img :src="imageData" class="i-div-preview-img">
      </div>
      <textarea class="i-div-input" placeholder="Add Content. (Min. 10 characters)" cols="72" v-model="answerText">
      </textarea>
      <div class="i-div-post">
          <button class="i-div-post-btn" @click="onSubmit">Post</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'inputWidget',
  props: {
    cid: Number
  },
  data () {
    return {
      imageData: '',
      answerText: ''
    }
  },
  methods: {
    previewImage (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    validate () {
      if (this.answerText.length < 10) {
        this.$alert('Invalid Answer Text, must be more than 10 characters')
        return false
      }
      return true
    },
    onSubmit () {
      if (this.validate()) {
        this.$store.dispatch('setAnswerRequestAction', {
          imageData: this.imageData,
          answerText: this.answerText,
          questionId: this.cid
        })
        setTimeout(() => {
          this.$store.dispatch('setQuestionAnswerRequestDataAction', this.cid)
          this.$store.dispatch('setGetParticularQuestionAction', this.cid)
        }, 1000)
        this.answerText = ''
        this.imageData = ''
      } else {
        setTimeout(() => {
          this.$store.dispatch('setQuestionAnswerRequestDataAction', this.cid)
          this.$store.dispatch('setGetParticularQuestionAction', this.cid)
        }, 1000)
      }
    }
  }
}
</script>

<style>
    *{
      outline: none;
    }
    .i-div-input{
      min-height: 100px;
      border: 1px solid lightgray;
      padding: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .i-div-post{
      border: 1px solid lightgray;
      border-top: 0px;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-top: -6px;
    }
    .i-div-post-top{
      border: 1px solid lightgray;
      margin-left: 10px;
      margin-right: 10px;
    }
    .i-div-post-btn{
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
    .i-div-post-btn:focus{
      outline: none;
    }
    .i-div-post-btn:hover{
      background-color: #4ca7ff;
      color: white;
    }
    .i-div-img{
      appearance: none;
      margin: 5px;
      cursor: pointer;
    }
    .image-upload-icon-css{
      width: 18px;
      height: 20px;
      margin-top: 8px;
      margin-left: 10px;
      cursor: pointer;
    }
    .i-div-preview-img{
      width: 100px;
      height: 100px;
      margin: 20px;
    }
</style>
