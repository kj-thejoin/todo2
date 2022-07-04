<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- <ul> -->
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" class="shadow" v-bind:key="todoItem.item" >
      <i class="checkBtn fas fa-check" aria-hidden="true" @click="toggleComplete(todoItem, index)" :class="[completed && checked ? 'checkBtnCompleted' :'checkBtn']"></i>
      <!-- propsdata로 변경 -->
        <span class="content">{{ todoItem.item }}</span>

        <input type="text" v-model="todoItems" @keyup.enter="changeItem(index)" v-show="toFix && checked==index" placeholder="수정 할 내용을 입력하세요."  />
        <span class="fixBtn">
          <i class="edit fa-solid fa-pencil" @click="changeItem"></i>
          <!-- <i calss="fas fa-pencil-alt" @click="changeItem">수정</i> -->
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
            <i class="yesBtn fa-solid fa-circle-check" v-on:click="removeTodo(todoItem, index)">예</i>
            <!-- <font-awesome-icon icon="fa-solid fa-check" /> -->
            <i class="noBtn fa-solid fa-ban no" @click="showModal=false">아니오</i>
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
    changeItem : function(index) {
      // 수정 사항이 있을 경우
      if(this.todoItems !== "") {
        // let value = this.todoItems && this.todoItems.trim();
        let value = this.todoItems
        this.$emit('fixContent', value, index);
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

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;

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

  .content{
  flex-grow:1;
  }

  .checkBtn {
  flex-basis: 1;
  line-height: 45px;
  color: #62acde;
  margin-right: 15px;
  }
  .checkBtnCompleted {
    flex-basis: 1;
    color: #b3adad;
    text-decoration: line-through;
          background-color: black;
  }
  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }

  .fixBtn {
    flex-basis: 1;
    margin-left: auto;
    margin-right:20px;
    color: #de4343;
  }
  .removeBtn {
    flex-basis: 1;
    margin-left: auto;
    color: #de4343;
  }

}







.list-enter-active, .list-leave-active{
  transition:all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


.modal-header h3 {
    margin-top: 0;
    color: #42b983;
    font-size:18px;
    
      
  }

  .modal-body{
    margin: 20px 0;
    
  }

  .modal-footer h3{
    
    color: #42b983;
    font-size:18px;
  }

  .yesBtn{
    margin-right:10px;
  }
  
</style>

