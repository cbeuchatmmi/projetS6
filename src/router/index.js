import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RavenView from '../views/RavenView.vue'
import MouseView from '../views/MouseView.vue'
import MemoryView from '../views/MemoryView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/raven', name: 'raven', component: RavenView },
    { path: '/mouse', name: 'mouse', component: MouseView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/memory', name: 'memory', component: MemoryView },

  ]
})

export default router
