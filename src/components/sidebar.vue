<template>
  <div class="container">
      <div class="inner-container">
        <div v-for="category in getCategoryList" :key="category.id" class="parent">
          <img v-if="category === 'technology'" src="../assets/technology.jpg" class="image-css">
          <img v-if="category === 'history'" src="../assets/history.jpg" class="image-css">
          <img v-if="category === 'health'" src="../assets/health.jpg" class="image-css">
          <img v-if="category === 'food'" src="../assets/food.jpg" class="image-css">
          <img v-if="category === 'horror'" src="../assets/horror.png" class="image-css">
          <img v-if="category === 'games'" src="../assets/games.jpg" class="image-css">
          <img v-if="category === 'music'" src="../assets/music.jpg" class="image-css">
          <img v-if="category === 'movies'" src="../assets/movies.jpg" class="image-css">
          <img v-if="category === 'science'" src="../assets/science.jpg" class="image-css">
          <img v-if="category === 'space'" src="../assets/space.jpg" class="image-css">
          <img v-if="category === 'sports'" src="../assets/sports.jpg" class="image-css">
          <img v-if="category === 'politics'" src="../assets/politics.jpeg" class="image-css">
          <img v-if="category === 'travel'" src="../assets/travel.jpeg" class="image-css">
          <img v-if="category === 'fitness'" src="../assets/fitness.jpg" class="image-css">
          <img v-if="category === 'education'" src="../assets/education.png" class="image-css">
          <img v-if="category === 'disaster'" src="../assets/disaster.jpeg" class="image-css">
          <img v-if="category === 'cars'" src="../assets/cars.jpg" class="image-css">
          <img v-if="category === 'anime'" src="../assets/anime.jpg" class="image-css">
          <button class="btn" @click="categorySelect" :id="category.substring(0,1).toUpperCase() + '' + category.substring(1, category.length)" :value="category.substring(0,1).toUpperCase() + '' + category.substring(1, category.length)">{{ category.substring(0,1).toUpperCase() + '' + category.substring(1, category.length) }}</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar',
  data () {
    return {
      categoryList: localStorage.getItem('categoryList')
    }
  },
  methods: {
    categorySelect (event) {
      console.log(event.target.id)
      const obj = {
        category: event.target.id
      }
      this.$store.dispatch('setGetQuestionsByCategoryAction', obj)
    }
  },
  computed: {
    ...mapGetters(['getCategoryList'])
  },
  created () {
    this.$store.dispatch('setGetUserCategoriesAction', localStorage.getItem('username'))
  }
}
</script>

<style scoped>
    *{
        outline: none;
    }
    .container{
        padding: 10px;
    }
    .btn{
        appearance: none;
        border-radius: 10px;
        width: fit-content;
        border: 1px solid white;
        background: whitesmoke;
        cursor: pointer;
    }
    .inner-container{
        float: right
    }
    .btn:hover{
        box-shadow: 0 0 40px 5px black;
    }
    .image-css{
        vertical-align: middle;
        margin-bottom: 10px;
        margin-right: 5px;
        width: 50px;
        height: 50px;
        border-radius: 5px;
    }
</style>
