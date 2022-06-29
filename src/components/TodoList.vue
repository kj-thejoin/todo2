<template>
  <div>
    <router-view></router-view>
    <ul>
      <li v-for="(todoItem, index) in propsdata" class="shadow" v-bind:key="todoItem.item">
      <!-- propsdata로 변경 -->
        {{ todoItem.item }}
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data: function() {
    return {
      todoItems: []
    }
  },
  props: ['propsdata'],
  methods: {
    // addTodo: function() {
    //   if (this.newTodoItem !== '') {
    //     var obj = {completed: false, item: this.newTodoItem};
    //     //(텍스트,텍스트) 가 아닌 (텍스트, 불린) 을 저장
    //     localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
    //     this.clearInput();
    //   }
    // },
    // addTodo: function() {
    //   this.$emit('addTodoItem', todoItem, index);
    // },
    removeTodo: function(todoItem, index) {
      this.$emit('removeItem', todoItem, index);
    },
    toggleComplete: function(todoItem, index) {
      this.$emit('toggleEvent', todoItem, index);
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}


.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

</style>

