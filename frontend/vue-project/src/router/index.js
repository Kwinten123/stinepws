import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/components/LoginComponent.vue'
import CreateArticleComponent from '@/components/CreateArticleComponent.vue'
import ArticlesComponent from '@/components/ArticlesComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/CreateArticle',
      name: 'CreateArticle',
      component: CreateArticleComponent,
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesComponent,
    },
  ],
})

export default router
