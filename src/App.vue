<!-- App.vue -->

<template>
  <div id="app">
    <router-view></router-view>
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트에서 메서드 명"></TodoInput> -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput> 
   <!-- <TodoList v-bind:내려보낼 프롭스 속성이름="현재 위치의 컴포넌트 데이터 속성"></TodoList> -->
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem"
    @:toggleEvent="toggleOneItem" 
    :completed ="completed"


    @checkItem="checkItem"
    :checked="checked"
    
    @toFixItem = "toFix = !toFix; checked = $event;"
    @fixContent="fixContent($event);"></TodoList>



    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';



export default {
  data: function() { //옮김
    return {
      id: [],
      todoItems: [],
      toFix: false,
      checked: 0,
      // completed:false
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      var obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      this.todoItems.splice(index, 1); //특정 index에서 하나를 지울 수 있음
      localStorage.removeItem(todoItem.item);
    },
    toggleOneItem: function(todoItem, index) {
      //todoItem.completed = !todoItem.completed;
       
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // this.completed = this.todoItems[index].completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function() {
      localStorage.clear();
      this.todoItems = []; //다시 빈 배열로 만들기
    },
    fixContent(todoItem){
      let lastIdx = this.todoItems.length -1;
      
      this.tempArr = this.todoItems.splice(this.checked, (this.todoItems.length - this.checked), todoItem); //수정할 타겟부터 끝까지 잘라내고, todoItems의 잘라낸 자리에 새로운 값 넣음 
      //this.todoItems.push(todoItem); //수정한 데이터 삽입
      if(this.checked !== lastIdx){ //체크한게 배열 마지막 값이 아니면
        let tempArr2 = this.tempArr.splice(1, this.tempArr.length -1); //최초값은 수정할 데이터이므로 제거
        this.tempArr = this.todoItems.concat(tempArr2);
        this.todoItems = this.tempArr;
      }
      //로컬스토리지 수정
      localStorage.clear();//기존 로컬스토리지 삭제
      for (let i = 0; i < this.todoItems.length; i++) { //새 데이터 삽입
        localStorage.setItem(this.todoItems[i], this.todoItems[i]);
      }
    },
    checkItem(index){
      console.log(index);
      this.checked = index;
    }
  },
  created: function() { //옮김
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  }
}
</script>

<style lang="scss">
@import "./assets/css/reset.scss";
@import "./assets/css/style.scss";

body {
  text-align:center;
  background-color:#f6f6f6;

}

input {
  border-style: groove;
  width:200px;
}

button{
  border-style:groove;
}

.shadow{
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}


@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

html, body {
  font-family: 'Itim', cursive;
}
#app {
  font-family: 'Itim', cursive;
}


.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
  text-decoration: line-through;
        background-color: black;
}

</style>