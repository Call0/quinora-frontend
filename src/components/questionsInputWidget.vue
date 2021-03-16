<template>
  <div class="q-div">
      <div class="q-div-post-top">
        <label for="q-div-img">
          <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" class="q-image-upload-icon-css">
        </label>
        <input type="file" class="q-div-img" accept="image/*" @change="previewImage">
      </div>
      <div class="q-div-image-preview" v-if="imageData.length > 0">
        <img :src="imageData" class="q-div-preview-img">
      </div>
      <div class="q-div-parent">
        <input type="text" v-model="questionTitle" class="q-div-input-field" placeholder="Title (Min 10 characters)">
        <select type="text" v-model="category" class="q-div-input-field" placeholder="Category">
            <option value="" selected>Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Food"> Food</option>
            <option value="Space">Space</option>
            <option value="Science"> Science</option>
            <option value="Music"> Music</option>
            <option value="Movies"> Movies</option>
            <option value="Anime"> Anime</option>
            <option value="Politics"> Politics</option>
            <option value="Horror"> Horror</option>
            <option value="Travel"> Travel</option>
            <option value="Disaster"> Disaster</option>
            <option value="Health"> Health</option>
            <option value="Fitness"> Fitness</option>
            <option value="Games"> Games</option>
            <option value="Education"> Education</option>
            <option value="Sports"> Sports</option>
            <option value="Car">Car</option>
            <option value="History">History</option>
        </select>
        <textarea class="q-div-input" v-model="questionText" placeholder="Ask your question here. (Min 30 characters)">
        </textarea>
      </div>
      <div class="q-div-post">
          <button class="q-div-post-btn" @click="onSubmit">Post</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'questionsInputWidget',
  data () {
    return {
      imageData: '',
      questionText: '',
      questionTitle: '',
      category: ''
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
    onSubmit () {
      this.$store.dispatch('setQuestionRequestAction', {
        imageData: this.imageData,
        questionText: this.questionText,
        questionTitle: this.questionTitle,
        category: this.category
      })
      setTimeout(() => {
        this.$store.dispatch('setGetAllQuestionsAction')
      }, 500)
      this.questionText = ''
      this.questionTitle = ''
      this.category = ''
      this.imageData = ''
    }
  }
}
</script>

<style>
    *{
      outline: none;
    }
    .q-div{
        width: 100%
    }
    .q-div-parent{
        width: 100%
    }
    .q-div-input{
      width: calc(100% - 20px);
      min-height: 100px;
      border: 1px solid lightgray;
      padding: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .q-div-post{
      border: 1px solid lightgray;
      border-top: 0px;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-top: -6px;
    }
    .q-div-post-top{
      border: 1px solid lightgray;
      margin-left: 10px;
      margin-right: 10px;
    }
    .q-div-post-btn{
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
    .q-div-post-btn:focus{
      outline: none;
    }
    .q-div-post-btn:hover{
      background-color: #4ca7ff;
      color: white;
    }
    .q-image-upload-icon-css{
      width: 18px;
      height: 20px;
      margin-top: 8px;
      margin-left: 10px;
      cursor: pointer;
    }
    .q-div-preview-img{
      width: 100px;
      height: 100px;
      margin: 20px;
    }
    .q-div-img{
      appearance: none;
      margin: 5px;
      cursor: pointer;
    }
    .q-div-input-field{
        width: calc(100% - 20px);
        display: block;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid lightgray;
        padding: 10px;
    }
</style>
