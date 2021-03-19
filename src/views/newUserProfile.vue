<template>
  <div>
    <navbar />
  <div class="userProfileContent">
      <div>
          <img class="userProfileImage" id="image" src="../assets/userprofile2.png" alt="imagehere">
          <div class="userNameDisplay"> {{ username }} </div>
          <div v-if="results.profession === null" class="userProfessionDisplay">No profession added by user</div>
          <div v-else class="userProfessionDisplay">{{ results.profession }}</div>
          <div v-if="badge === 'NoBadge'" class="userBadgeDisplay">No Badge</div>
          <div v-else class="userBadgeDisplay">{{ badge }}</div>
          <div v-if="results.bio === null" class="userbio">No bio added by user</div>
          <div v-else class="userbio"><b>Bio:</b> {{results.bio}}</div>
          <div class="userProfileDetails">
            <ul>
              <li><a @click="viewProfileDetails">View Profile Details</a></li>
              <li><a @click="viewEmploymentDetails">Employment Details</a></li>
              <li> <a @click="viewEducationDetails">Education Details </a></li>
            </ul>
            <div class="viewProfDetails" id="viewProfDetails" v-show="detailShow">
                <table >
                    <tr>
                    <td>
                    <label for="firstName"  class="displayTextCss"> First Name :</label>
                    </td>
                    <td style="text-align: left;">{{results.firstName}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="lastName" class="displayTextCss"> Last Name :</label>
                    </td>
                    <td>{{results.lastName}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="city" class="displayTextCss"> City :</label>
                    </td>
                    <td>{{results.city}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="state" class="displayTextCss"> State :</label>
                    </td>
                    <td>{{results.state}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="country" class="displayTextCss"> Country :</label>
                    </td>
                    <td>{{results.country}}</td>
                    </tr>
                </table>
            </div>
            <div v-show="educationDetailShow" id="viewEduDetails" v-for="edu in results.education" :key="edu.id">
              <div class="viewEduDetails" v-if="edu.school !== null">
                <table>
                    <tr>
                    <td>
                    <label for="School" class="displayTextCss"> School :</label>
                    </td>
                    <td>{{edu.school}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="primary" class="displayTextCss"> Primary Subject :</label>
                    </td>
                    <td>{{edu.primaryDetail}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="gradYear" class="displayTextCss"> Graduation Year :</label>
                    </td>
                    <td>{{edu.graduationYear}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="degree" class="displayTextCss"> Degree :</label>
                    </td>
                    <td>{{edu.degree}}</td>
                    </tr>
                </table>
              </div>
            </div>
            <div v-show="employmentDetailShow" id="viewEmpDetails" v-for="emp in results.employment" :key="emp.id">
              <div class="viewEmpDetails"  v-if="emp.position !== null">
                <table>
                    <tr>
                    <td>
                    <label for="position" class="displayTextCss"> Position :</label>
                    </td>
                    <td>{{emp.position}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="company" class="displayTextCss"> Company :</label>
                    </td>
                    <td>{{emp.organization}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="startYear" class="displayTextCss"> Start Year :</label>
                    </td>
                    <td>{{emp.startYear}}</td>
                    </tr>
                    <tr>
                    <td>
                    <label for="endYear" class="displayTextCss"> End Year :</label>
                    </td>
                    <td>{{emp.endYear}}</td>
                    </tr>
                </table>
              </div>
            </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from '../components/navbar.vue'
export default {
  name: 'newUserProfile',
  data () {
    return {
      detailShow: false,
      employmentDetailShow: false,
      educationDetailShow: false,
      username: localStorage.getItem('goToUsername'),
      results: [],
      badge: ''
    }
  },
  components: {
    navbar: navbar
  },
  created () {
    this.username = localStorage.getItem('goToUsername')
    const axiosConfig = {
      method: 'get',
      baseURL: 'http://10.177.68.69:808/',
      url: `/details/user/findByUserName/${this.username}`,
      headers: {
        Authorization: localStorage.getItem('sessionId')
      }
    }
    axios(axiosConfig)
      .then((output) => {
        console.log(output)
        localStorage.setItem('userDetails', output.data)
        this.results = output.data
        console.log(this.results)
        this.results.array.forEach(e => {
          this.results.push(e)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    const axiosConfig1 = {
      method: 'get',
      baseURL: 'http://10.177.68.69:808/',
      url: `/details/badge/${localStorage.getItem('goToUsername')}`,
      headers: {
        Authorization: localStorage.getItem('sessionId')
      }
    }
    axios(axiosConfig1)
      .then(e => { this.badge = e.data.ranking })
      .catch(e => console.log(e))
    if (localStorage.getItem('sessionId') === null) {
      this.$router.push('/login')
    }
  },
  methods: {
    viewProfileDetails () {
      this.detailShow = true
      var x = document.getElementById('viewProfDetails')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    },
    viewEmploymentDetails () {
      this.employmentDetailShow = true
      var x = document.getElementById('viewEmpDetails')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    },
    viewEducationDetails () {
      this.educationDetailShow = true
      var x = document.getElementById('viewEduDetails')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    }
  }
}
</script>

<style scoped>
.userProfileContent {
    background-color: whitesmoke;
    margin-left: 270px;
    height: 300px;
    margin-top: 150px;
    margin-bottom: 20px;
    width: 900px;
    border: 2px solid gray;
    border-radius: 10px;
    box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
-webkit-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
-moz-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
}
.userProfileImage {
    margin-top: 50px;
    height: 130px;
    margin-left: 50px;
    border-radius: 70px;
}
.userNameDisplay {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-left: 220px;
    margin-top: -102px;
}
.userProfessionDisplay {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-left: 220px;
    margin-top: 6px;
}
.userBadgeDisplay {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-left: 220px;
    margin-top: 5px;
}
.userbio {
    margin-top: 25px;
    margin-left: 70px;
}
.userProfileDetails {
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
    border-top: 2px solid gray;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.userProfileDetails ul {
  list-style-type: none;
  margin-top: 10px;
  margin: 2px;
  padding: 0;
  overflow: hidden;
  border-top: 10px;
}
.userProfileDetails li {
  float: left;
}
.userProfileDetails li a {
  display: block;
  color:black;
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
}
.userProfileDetails li a:hover:not(.active) {
  background-color:white;
  border-radius: 10px;
  cursor: pointer;
}
.viewProfDetails {
    background-color: whitesmoke;
    margin-top:50px;
    margin-left: -48px;
    height:300px;
    width: 900px;
    border: 2px solid gray;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
-webkit-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
-moz-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
}
.viewEmpDetails {
    background-color: whitesmoke;
    margin-top:50px;
    margin-left: -48px;
    height:250px;
    width: 900px;
    border: 2px solid gray;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
-webkit-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
-moz-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
}
.viewEduDetails {
    background-color: whitesmoke;
    margin-top:50px;
    margin-left: -48px;
    height:250px;
    width: 900px;
    border: 2px solid gray;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
    -webkit-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
    -moz-box-shadow: 10px 7px 36px -11px rgba(0,0,0,0.77);
}
.displayTextCss {
    margin-top: 10px;
    margin-left: 50px;
}
#topMarginForText {
    margin-top: 50px;
}
body{
   background: rgb(79,9,31);
background: linear-gradient(90deg, rgba(79,9,31,0.30155812324929976) 0%, rgba(171,1,1,0.7917542016806722) 21%, rgba(205,18,18,0.5172443977591037) 83%);
}
</style>
