<template>
  <div>
    <navbar />
    <showProfile />
    <addCredentials />
    <tabs />
  </div>
</template>

<script>
import showProfile from '../components/showProfile.vue'
import navbar from '../components/navbar.vue'
import addCredentials from '../components/addCredentials.vue'
import tabs from '../components/tabs.vue'
export default {
  components: {
    showProfile: showProfile,
    navbar: navbar,
    addCredentials: addCredentials,
    tabs: tabs
  }
}
</script>

<style scoped>
</style>
