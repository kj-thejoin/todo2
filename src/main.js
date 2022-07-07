import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
// import router from './router/index.js';

import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
// import NavigationBar from './components/NavigationBar.vue';


Vue.config.productionTip = false

// 전역 컴포넌트
Vue.component('TodoHeader', TodoHeader);
Vue.component('TodoInput', TodoInput);
Vue.component('TodoList', TodoList);
Vue.component('TodoFooter', TodoFooter);
// Vue.component('NavigationBar', NavigationBar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
