<template>
  <div class="conatiner">
    <div class="hardcoded-text">
        Answer . Recommended for you
    </div>
    <span>Answered by:<b> {{ username }}</b></span>
  </div>
</template>

<script>
export default {
  name: 'headComponentQAHome',
  props: {
    username: String
  }
}
</script>

<style scoped>
    .conatiner{
        padding: 10px;
        border: 1px solid whitesmoke;
        border-radius: 10px;
    }
    .hardcoded-text{
        font-size: 12px;
        margin-bottom: 5px;
        color: lightgray
    }
</style>
