import { createRouter, createWebHistory } from 'vue-router'
import PrizesView from '../views/PrizesView.vue'
import LaureatsView from '../views/LaureatsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/prizes' },
    { path: '/prizes', component: PrizesView },
    { path: '/laureats', component: LaureatsView }
  ],
})

export default router