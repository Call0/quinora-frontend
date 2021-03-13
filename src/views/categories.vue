<template>
  <div class="container">
    <div class="parent">
        <div class="heading">
            <h3>One Last Step</h3>
        </div>
        <div class="content">
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="technology" value="technology" @click='validate'>
                <p class="inner-content">Technology</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="food" value="food" @click='validate'>
                <p class="inner-content">Food</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="space" value="space" @click='validate'>
                <p class="inner-content">
                    Space
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="science" value="science" @click='validate'>
                <p class="inner-content">
                    Science
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="music" value="music" @click='validate'>
                <p class="inner-content">
                    Music
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="movies" value="movies" @click='validate'>
                <p class="inner-content">
                    Movies
                </p>
            </div>
        </div>
        <div class="content">
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="anime" value="anime" @click='validate'>
                <p class="inner-content">
                    Anime
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="politics" value="politics" @click='validate'>
                <p class="inner-content">
                    Politics
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="horror" value="horror" @click='validate'>
                <p class="inner-content">
                    Horror
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="travel" value="travel" @click='validate'>
                <p class="inner-content">
                    Travel
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="disaster" value="disaster" @click='validate'>
                <p class="inner-content">
                    Disaster
                </p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="health" value="health" @click='validate'>
                <p class="inner-content">
                    Health
                </p>
            </div>
        </div>
        <div class="content">
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="fitness" value="fitness" @click='validate'>
                <p class="inner-content">Fitness</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="games" value="games" @click='validate'>
                <p class="inner-content">Games</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="education" value="education" @click='validate'>
                <p class="inner-content">Education</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="sports" value="sports" @click='validate'>
                <p class="inner-content">Sports</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="cars" value="cars" @click='validate'>
                <p class="inner-content">Cars</p>
            </div>
            <div class="inner-content-card">
                <input type="checkbox" name="category" class="input-checkbox" id="history" value="history" @click='validate'>
                <p class="inner-content">History</p>
            </div>
        </div>
        <div class="footing">
            <button class="btn" id="continue-btn" disabled="true" @click="toLogin"><span id="counter">Follow 5 Topics to Continue</span></button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'categories',
  data () {
    return {
      categoryList: [],
      technology: '',
      movies: '',
      food: '',
      space: '',
      science: '',
      music: '',
      anime: '',
      politics: '',
      horror: '',
      travel: '',
      disaster: '',
      health: '',
      fitness: '',
      games: '',
      education: '',
      sports: '',
      cars: '',
      history: ''
    }
  },
  methods: {
    validate () {
      var count = document.querySelectorAll('input[name=category]:checked').length
      if (count >= 5) {
        document.getElementById('continue-btn').disabled = false
        document.getElementById('counter').innerText = 'Continue'
      } else {
        document.getElementById('continue-btn').disabled = true
        var num = 5 - count
        document.getElementById('counter').innerText = 'Follow ' + num + ' more Topics to Continue'
      }
    },
    toLogin () {
      if (document.getElementById('technology').checked) {
        this.categoryList.push(document.getElementById('technology').value)
      }
      if (document.getElementById('food').checked) {
        this.categoryList.push(document.getElementById('food').value)
      }
      if (document.getElementById('space').checked) {
        this.categoryList.push(document.getElementById('space').value)
      }
      if (document.getElementById('science').checked) {
        this.categoryList.push(document.getElementById('science').value)
      }
      if (document.getElementById('movies').checked) {
        this.categoryList.push(document.getElementById('movies').value)
      }
      if (document.getElementById('music').checked) {
        this.categoryList.push(document.getElementById('music').value)
      }
      if (document.getElementById('anime').checked) {
        this.categoryList.push(document.getElementById('anime').value)
      }
      if (document.getElementById('politics').checked) {
        this.categoryList.push(document.getElementById('politics').value)
      }
      if (document.getElementById('horror').checked) {
        this.categoryList.push(document.getElementById('horror').value)
      }
      if (document.getElementById('travel').checked) {
        this.categoryList.push(document.getElementById('travel').value)
      }
      if (document.getElementById('fitness').checked) {
        this.categoryList.push(document.getElementById('fitness').value)
      }
      if (document.getElementById('disaster').checked) {
        this.categoryList.push(document.getElementById('disaster').value)
      }
      if (document.getElementById('health').checked) {
        this.categoryList.push(document.getElementById('health').value)
      }
      if (document.getElementById('education').checked) {
        this.categoryList.push(document.getElementById('education').value)
      }
      if (document.getElementById('sports').checked) {
        this.categoryList.push(document.getElementById('sports').value)
      }
      if (document.getElementById('games').checked) {
        this.categoryList.push(document.getElementById('games').value)
      }
      if (document.getElementById('cars').checked) {
        this.categoryList.push(document.getElementById('cars').value)
      }
      if (document.getElementById('history').checked) {
        this.categoryList.push(document.getElementById('history').value)
      }
      this.$store.dispatch('setCategoriesAction', this.categoryList)
    }
  },
  created () {
  }
}
</script>

<style scoped>
    *{
        outline: none;
    }
    body{
        margin: 0px;
        font-family: 'Montserrat', sans-serif;
        z-index: 1;
    }
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .parent{
        width: 762px;
        border: 1px solid lightgray;
        border-radius: 10px
    }
    .heading{
        float: left;
        padding-left: 10px;
        padding-right: 10px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid white;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        background-color: #E8E8E8;
    }
    .content{
        height: 120px;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 760px;
    }
    .inner-content-card{
        width: 114px;
        height: 110px;
        border: 1px solid white;
        border-radius: 3px;
        text-align: center;
    }
    .footing{
        margin-top: 10px;
        float: right;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid white;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #E8E8E8;
    }
    .btn{
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #4ca7ff;
        float: right;
        background-color: #4ca7ff;
        color: white;
        cursor: pointer;
    }
    .inner-img{
        display: none;
        position: relative;
        cursor: pointer;
        border-radius: 3px;
    }
    .inner-img:hover{
        filter: grayscale(40%);
    }
    .inner-content{
        position: absolute;
        margin-left: 7px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        margin-top: 90px;
    }
    input[type="checkbox"]{
        appearance: none;
        width: 114px;
        height: 100px;
        cursor: pointer;
        border-radius: 5px;
    }
    .input-checkbox{
        position: absolute;
        margin-left: -57px;
        margin-top: 10px;
        border: 1px solid white;
    }
    .input-checkbox:hover{
        filter: grayscale(40%);
        box-shadow: 0 0 40px 5px black;
    }
    #technology{
        background: url('../assets/technology.jpg');
        background-size: 114px 100px;
    }
    #food{
        background: url('../assets/food.jpg');
        background-size: 114px 100px;
    }
    #space{
        background: url('../assets/space.jpg');
        background-size: 114px 100px;
    }
    #science{
        background: url('../assets/science.jpg');
        background-size: 114px 100px;
    }
    #music{
        background: url('../assets/music.jpg');
        background-size: 114px 100px;
    }
    #movies{
        background: url('../assets/movies.jpg');
        background-size: 114px 100px;
    }
    #anime{
        background: url('../assets/anime.jpg');
        background-size: 114px 100px;
    }
    #politics{
        background: url('../assets/politics.jpeg');
        background-size: 114px 100px;
    }
    #horror{
        background: url('../assets/horror.png');
        background-size: 114px 100px;
    }
    #travel{
        background: url('../assets/travel.jpeg');
        background-size: 114px 100px;
    }
    #disaster{
        background: url('../assets/disaster.jpeg');
        background-size: 114px 100px;
    }
    #health{
        background: url('../assets/health.jpg');
        background-size: 114px 100px;
    }
    #fitness{
        background: url('../assets/fitness.jpg');
        background-size: 114px 100px;
    }
    #games{
        background: url('../assets/games.jpg');
        background-size: 114px 100px;
    }
    #education{
        background: url('../assets/education.png');
        background-size: 114px 100px;
    }
    #sports{
        background: url('../assets/sports.jpg');
        background-size: 114px 100px;
    }
    #cars{
        background: url('../assets/cars.jpg');
        background-size: 114px 100px;
    }
    #history{
        background: url('../assets/history.jpg');
        background-size: 114px 100px;
    }
    input[type="checkbox"]:checked{
        border: 2px solid red;
    }
    .btn:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
