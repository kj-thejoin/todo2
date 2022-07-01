<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- <ul> -->
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" class="shadow" v-bind:key="todoItem.item" >
      <i class="checkBtn fas fa-check" aria-hidden="true" @click="toggleComplete(todoItem, index)" :class="[completed && checked==index ? 'checkBtnCompleted' :'checkBtn']"></i>
      <!-- propsdata로 변경 -->
        {{ todoItem.item }}

        <input type="text" v-model="todoItems" @keyup.enter="changeItem" v-show="toFix" placeholder="수정 할 내용을 입력하세요." v-bind:class="[todoItems.completed ? 'checkBtnCompleted' :'checkBtn']" />
        <span class="fixBtn">
          <i calss="fas fa-pencil-alt" @click="changeItem">수정</i>
        </span>

        
        <span class="removeBtn" v-on:click="checkItem(index)">
          <i class="fas fa-trash-alt"></i>
        </span>


        <Modal v-if="showModal && checked===index" >
          <h3 slot="header">
            확인 창
          </h3>
          <h3 slot="body">
            정말 삭제하시겠습니까?
          </h3>
          <h3 slot="footer">
            <i class="fa-solid fa-y yes" v-on:click="[removeTodo(todoItem, index), showModal=false]">예</i>
            <i class="fa-solid fa-ban no" @click="showModal=false">아니오</i>
          </h3>

        </Modal>
      </li>
    <!-- </ul> -->
    </transition-group>
  </div>
</template>


<script>
import Modal from './common/ModalChk.vue';

export default {
    data() {
    return {
      todoItems: [],
      showModal:false,
      
      isStyle: false
    }
  }
  ,
  components: {
    "Modal": Modal
  },
  props: {'propsdata' : [], 'toFix':Boolean, 'checked':Number, 'completed': Boolean},
  methods: {
    removeTodo: function(todoItem, index) {
      this.$emit('removeItem', todoItem, index);
    },
    toggleComplete: function(todoItem, index) {
      this.$emit('toggleEvent', todoItem, index);
    },
    changeItem : function() {
      // 수정 사항이 있을 경우
      if(this.todoItems !== "") {
        let value = this.todoItems && this.todoItems.trim();
        this.$emit('fixContent', value);
        this.todoItems = '';
      }
      this.$emit('toFixItem');
    },
    checkItem(index){
      this.showModal = true;
      this.$emit('checkItem', index);
    },
    // checkedItem(index) {
    //   this.$emit('changeCheck', index);
    // },
    // styleToggle : function() {
    //   this.isStyle != this.isStyle
    // },
    // checkedToggle : function() {
    //   this.checked != this.checked
    // },
    
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
  text-decoration: line-through;
        background-color: black;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.fixBtn {
  margin-left: auto;
  color: #de4343;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}


.list-enter-active, .list-leave-active{
  transition:all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

