<!-- TodoInput.vue -->

<template>
  <section class="inputBox shadow">
      <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
      <!-- <button v-on:click="addTodo">add</button> -->
      
      <span class="addContainer" v-on:click="addTodo">
        <i class="fas fa-plus addBtn" aria-hidden="true"></i>
      </span>
  </section>
</template>

<script>
export default {
  name : 'TodoInput',
  data () {
    return{
        newTodoItem: ''
    };
  },
  methods: {
    addTodo: function() {
      if (this.newTodoItem !== '') {
        // this.$emit('이벤트 이름', 인자1, 인자2, ...);
        this.$emit('addTodoItem', this.newTodoItem)
        this.clearInput();
      }
    },
    clearInput: function() {
      this.newTodoItem= ''; //비워주기(초기화)
    }
  }
}
</script>

<style lang="scss" scoped>

  input:focus{
    outline: none;
  }
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;

    // .inputBox input {
  .inputBox input{
      border-style: none;
      font-size: 0.9rem;
      width:100%;
    }
  .addContainer {
    float: right;
    background: linear-gradient(to right, #62EAC6, #32CEE6);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
    cursor:pointer;
  }
  .addBtn {
    color: white;
    vertical-align: middle;
  }
}

</style>