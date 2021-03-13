<template>
  <div class="tabs">
      <div class="profileUnderline">
        <ul>
          <li><a @click="profile">Add Profile Details</a></li>
          <li><a @click="viewProfileDetails">View Profile Details</a></li>
          <li> <a @click="viewMyQuestions">View My Questions</a></li>
        </ul>
      </div>
      <span class="Profile" v-show="profileShow" id="profilepage">
        <table>
          <tr>
            <td>
              <label for="firstName">First Name</label>
            </td>
            <td>
              <input class="common-input-text-css" type="text" v-model="firstName" id="firstName" placeholder="Enter First Name"><br>
            </td>
          </tr>
          <tr>
            <td>
              <label for="lastName">Last Name  </label>
            </td>
            <td>
              <input class="common-input-text-css" type="text" v-model="lastName" id="lastName" placeholder="Enter Last Name"><br>
            </td>
          </tr>
          <tr>
            <td><label for="profession">Profession  </label></td>
            <td><input class="common-input-text-css" type="text" v-model="profession" id="profession" placeholder="Enter Profession Name"><br></td>
          </tr>
          <tr>
            <td><label for="city">City   </label><br></td>
            <td> <input type="text" v-model="city" id="city" class="common-input-text-css" placeholder="Enter City Name"></td>
          </tr>
          <tr>
            <td><label for="stateAddress">State  </label></td>
            <td><input type="text" v-model="stateAddress" id="stateAddress" class="common-input-text-css" placeholder="Enter State Name"></td>
          </tr>
          <tr>
            <td><label for="country">Country </label></td>
            <td><input type="text" v-model="country" id="country" class="common-input-text-css" placeholder="Enter Country Name"></td>
          </tr>
          <tr>
            <td><label for="bio">Bio </label></td>
            <td><textarea v-model="bio" id="bio" name="bio" rows="4" cols="40" class="common-input-text-css" placeholder="Enter your Bio"></textarea></td>
          </tr>
        </table>
       <button class="button-btn btn-common-css" @click="postData">Save Profile</button>
    </span>
    <span class = "profileDetails" v-show="profileDetails" id="profileDetails">
        <legend>Personal Details</legend>
        <table class="give-border-css">
          <tr>
            <td>
            <label for="firstName" class="displayTextCss"> First Name : {{ getCurrentUserDetails.firstName }} </label>
            </td>
            <td style="text-align: left;"></td>
          </tr>
          <tr>
          <td>
          <label for="lastName" class="displayTextCss"> Last Name : {{ getCurrentUserDetails.lastName }} </label>
          </td>
          <td></td>
          </tr>
          <tr>
          <td>
          <label for="city" class="displayTextCss"> City : {{ getCurrentUserDetails.city }} </label>
          </td>
          <td></td>
          </tr>
          <tr>
          <td>
          <label for="state" class="displayTextCss"> State : {{ getCurrentUserDetails.state }}</label>
          </td>
          <td></td>
          </tr>
          <tr>
          <td>
          <label for="country" class="displayTextCss"> Country : {{ getCurrentUserDetails.country }}</label>
          </td>
          <td></td>
          </tr>
        </table>
        <legend>Education Details</legend>
        <div v-for="education in getCurrentUserDetails.education" :key="education.id">
          <table v-if="education.school !== null" class="give-border-css">
          <tr>
            <td>School: {{education.school}}</td>
          </tr>
          <tr>
            <td>Primary Subjects: {{education.primaryDetail}}</td>
          </tr>
          <tr>
            <td>Start Year: {{education.startYear}}</td>
          </tr>
          <tr>
            <td>Graduation: {{education.degree}}</td>
          </tr>
          </table>
        </div>
        <legend>Employment Details</legend>
        <div v-for="emp in getCurrentUserDetails.employment" :key="emp.id">
          <table v-if="emp.position !== null" class="give-border-css">
          <tr>
            <td>Position: {{emp.position}}</td>
          </tr>
          <tr>
            <td>Company/Organisation: {{emp.organization}}</td>
          </tr>
          <tr>
            <td>Start Year: {{emp.startYear}}</td>
          </tr>
          <tr>
            <td>End Year: {{emp.endYear}}</td>
          </tr>
          </table>
        </div>
    </span>
    <span class = "profileQuestions" v-show="profileQuestions" id="profileQuestions">
        <div v-if="getQuestionListForUser.length > 0">
          <div v-for="item in getQuestionListForUser" :key="item.id" class="display-me-something-border">
            <questionComponentHome :question="item.questionText" :src="item.questionImage" :category="item.category" :id="item.questionId" :createdAt="item.createdAt" />
            <div>
              <button class="d-a-btn" @click="deleteQues" :value="item.questionId">Delete</button>
            </div>
          </div>
        </div>
        <div v-else class="q-a-parent-height-css">
          No Questions Yet.
        </div>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import questionComponentHome from '../components/questionComponentHome.vue'
export default {
  data () {
    return {
      profileShow: false,
      profileDetails: false,
      profileQuestions: false
    }
  },
  components: {
    questionComponentHome: questionComponentHome
  },
  computed: {
    ...mapGetters(['getQuestionListForUser', 'getCurrentUserDetails'])
  },
  methods: {
    deleteQues (event) {
      this.$store.dispatch('deleteQuestionAction', event.target.value)
    },
    postData () {
      const obj = {
        firstName: this.firstName,
        lastName: this.lastName,
        profession: this.profession,
        city: this.city,
        state: this.stateAddress,
        country: this.country,
        bio: this.bio
      }
      this.$store.dispatch('setUserDetailsAction', obj)
    },
    profile () {
      this.profileShow = !this.profileShow
      var x = document.getElementById('profilepage')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
      var x1 = document.getElementById('profileDetails')
      x1.style.display = 'none'
      var x2 = document.getElementById('profileQuestions')
      x2.style.display = 'none'
    },
    viewProfileDetails () {
      this.$store.dispatch('getCurrentUserProfileAction')
      this.profileDetails = !this.profileDetails
      var x = document.getElementById('profileDetails')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
      var x1 = document.getElementById('profilepage')
      x1.style.display = 'none'
      var x2 = document.getElementById('profileQuestions')
      x2.style.display = 'none'
    },
    viewMyQuestions () {
      this.$store.dispatch('setQuestionListForUserAction')
      this.profileQuestions = !this.profileQuestions
      var x = document.getElementById('profileQuestions')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
      var x1 = document.getElementById('profilepage')
      x1.style.display = 'none'
      var x2 = document.getElementById('profileDetails')
      x2.style.display = 'none'
    }
  }
}
</script>

<style scoped>
.profileUnderline {
    border-top: 1px solid black;
    border-bottom: 1px solid black ;
    margin-bottom: 10px;
}
.highligtUnderline {
    border-top: 1px solid black;
}
.tabs ul {
  list-style-type: none;
  margin: 2px;
  padding: 0;
  overflow: hidden;
}

.tabs li {
  float: left;
}
.tabs li a {
  display: block;
  color:black;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  cursor: pointer;
}

.tabs {
    border-radius: 10px;
    background: #f5f4f4;
    width:50vw;
    position: absolute;
    top:35%;
    margin-left:10px;
    padding: 20px;
    box-shadow: 8px 8px 19px 0px rgba(0,0,0,0.75);
}
.tabs .Profile {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 40px;
  padding-left: 40px;
}
.tabs input[type = 'text'] {
  background: transparent;
  border-radius: 5px;
  border: none;
  border-bottom: 2px solid rgb(29, 27, 27);
}
td{
  padding: 10px;
}
input{
  width: 50%;
}
table{
  margin-bottom: 15px;
}
.button-btn {
  padding: 10px;
  border-radius: 5px;
  margin-top:20px;
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
.display-me-something-border{
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
}
.q-a-parent-height-css{
  width: 100%;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.give-border-css{
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-bottom: 30px;
}
</style>
