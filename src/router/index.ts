import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/main.vue')
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('@/pages/Catalog.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about.vue')
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/pages/services.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
