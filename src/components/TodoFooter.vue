<template>
  <footer class="clearAllContainer">
    <!-- <router-view></router-view> -->
      <span class="clearAllBtn" v-on:click="clearTodo">Clear All</span>
  </footer>
</template>

<script>
export default {
  name : 'TodoFooter',
  methods: {
    clearTodo: function() {
      this.$emit('clearAll');
    }
  }
}

</script>

<style lang="scss" scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>