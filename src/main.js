import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Auth from './components/Auth.vue'
import Todo from './components/Todo.vue'
import User from './components/User.vue'

const routes = [
    { path: '/', component: Auth },
    { path: '/todo', component: Todo },
    { path: '/user', component: User },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  
createApp(App).use(router).mount('#app')