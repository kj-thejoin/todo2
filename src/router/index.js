// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 보통 import를 통해서 정의합니다.
import App from '../App.vue'
import TodoHeader from '../components/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFooter from '../components/TodoFooter.vue'


const router = new VueRouter ({
    mode:'history' // 해시값 제거 방식
    routes:
    [
    {
        path: "/home",
        name: "home",
        component: App
    },
    {
        path: "/header",
        name: "header",
        component: TodoHeader
    },
    {
        path: "/input",
        name: "input",
        component: TodoInput
    },
    {
        path: "/list",
        name: "list",
        component: TodoList
    },
    {
        path: "/footer",
        name: "footer",
        component: TodoFooter
    }    
]

})