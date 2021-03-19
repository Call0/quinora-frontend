<template>
  <div class="add-details">
      <div class="add-education">
        <h6>Add Education Details</h6>
        <hr>
        <table>
          <tr>
            <td>
              <span>School</span>
            </td>
            <td>
              <input type='text' v-model='schoolname' placeholder="Enter School Name"><br>
            </td>
          </tr>
          <tr>
            <td>
              <span>Primary Subject</span>
            </td>
            <td>
              <input type='text' v-model='primaryname' placeholder="Enter Primary Details"><br>
            </td>
          </tr>
          <tr>
            <td>
              <span>Degree</span>
            </td>
            <td>
              <input type='text' v-model='degreename' placeholder="Enter Degree Name"><br>
            </td>
          </tr>
          <tr>
            <td>
              <span> Select Completion Year </span>
            </td>
            <td>
              <select id="educationStartYear">
            <option>Select Year </option>
            <option v-for="year in getCurrentYear" :value="year" :key="year.id">{{ year }}</option>
        </select>
            </td>
          </tr>
        </table>
        <br>
        <button type = 'submit' id='add-education-btn' @click = "saveEducationDetails"> Save Education Details </button>
      </div>
      <div class="add-employement">
        <h6>Add Employment Details</h6>
        <hr>
        <table>
          <tr>
            <td>
              <span>Position</span>
            </td>
            <td>
              <input type='text' v-model='positionname' placeholder="Enter Position"><br>
            </td>
          </tr>
          <tr>
            <td>
               <span>Company/ Organization</span>
            </td>
            <td>
              <input type='text' v-model='companyname' placeholder="Enter Company"><br>
            </td>
          </tr>
          <tr>
            <td>
              <span> Select Start Year </span>
            </td>
            <td>
              <select id="employmentStartYear">
                <option>Select Year </option>
                <option v-for="year in getCurrentYear" :value="year" :key="year.id">{{ year }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <span>Select End Year </span>
            </td>
            <td>
            <select id="employmentEndYear">
              <option>Select Year </option>
              <option v-for="year in getCurrentYear" :value="year" :key="year.id">{{ year }}</option>
            </select>
            </td>
          </tr>
        </table>
        <button type = 'submit' id='add-education-btn' @click = "saveEmploymentDetails"> Save Employment Details </button>
      </div>
      <button type = 'submit' id = 'save-to-databse' @click = "saveToDatabase"> Save </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      years: [],
      educationalDetails: [{}],
      employmentDetails: [{}]
    }
  },
  computed: {
    getCurrentYear () {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 1900 }, (value, index) => 1901 + index)
    }
  },
  methods: {
    saveToDatabase () {
      const axiosConfig = {
        method: 'put',
        baseURL: 'http://10.177.68.69:808/',
        url: `/details/user/updateUser/${localStorage.getItem('username')}`,
        data: {
          bio: this.$store.state.userDetails.bio,
          city: this.$store.state.userDetails.city,
          country: this.$store.state.userDetails.country,
          firstName: this.$store.state.userDetails.firstName,
          lastName: this.$store.state.userDetails.lastName,
          profession: this.$store.state.userDetails.profession,
          profileImg: '',
          state: this.$store.state.userDetails.state,
          education: this.educationalDetails,
          employment: this.employmentDetails,
          username: localStorage.getItem('username')
        },
        headers: {
          Authorization: localStorage.getItem('sessionId')
        }
      }
      axios(axiosConfig)
        .then(e => console.log(e))
        .catch(e => console.log(e))
    },
    saveEmploymentDetails () {
      const employmentObject = {
        position: this.positionname,
        organization: this.companyname,
        startYear: document.getElementById('employmentStartYear').value,
        endYear: document.getElementById('employmentEndYear').value
      }
      this.positionname = ''
      this.companyname = ''
      this.employmentDetails.push(employmentObject)
    },
    saveEducationDetails () {
      const educationObject = {
        school: this.schoolname,
        primaryDetail: this.primaryname,
        graduationYear: document.getElementById('educationStartYear').value,
        degree: this.degreename
      }
      this.schoolname = ''
      this.primaryname = ''
      this.degreename = ''
      this.educationalDetails.push(educationObject)
    }
  }
}
</script>

<style scoped>
body {
  background-color: rgb(9,11,79) !important;
  background-color: linear-gradient(90deg, rgba(9,11,79,0.2511379551820728) 0%, rgba(1,137,171,1) 27%, rgba(0,212,255,0.29315476190476186) 88%)  !important;
}
button {
  padding: 10px;
  border-radius: 5px;
  margin-top:20px;
}
input[type = 'text'] {
  background: transparent;
  border-radius: 5px;
  border: none;
  border-bottom: 2px solid rgb(29, 27, 27);
}
.add-details {
    position: absolute;
    top:10%;
    right:5%;
}
.add-education {
    box-shadow: 8px 8px 19px 0px rgba(0,0,0,0.75);
    padding: 20px;
    background-color:#f5f4f4;
    width:30vw;
    height: 40vh;
    margin-bottom: 10px;
    border-radius: 10px;
}
.add-employement {
    padding: 20px;
    background-color: #f5f4f4;
    width:30vw;
    height: 40vh;
    box-shadow: 8px 8px 19px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
}

.add-employement hr {
    padding: 0;
    border: none;
    border-top: medium double #333;
    color: #333;
    text-align: center;
}
.add-education hr {
    padding: 0;
    border: none;
    border-top: medium double #333;
    color: #333;
    text-align: center;
}
input,select,span{
  margin-right: 5px;
  margin-top:5px;
}
</style>
