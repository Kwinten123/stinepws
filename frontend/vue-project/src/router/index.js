import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/components/LoginComponent.vue'
import EditArticleComponent from '@/components/articles/EditArticleComponent.vue'
import ArticlesComponent from '@/components/articles/ArticlesComponent.vue'
import EditArticleDetailsComponent from '@/components/articles/EditArticleDetailsComponent.vue'
import ArticlePreviewComponent from '@/components/articles/ArticlePreviewComponent.vue'
import ArticleUserComponent from '@/components/articles/ArticleUserComponent.vue'
import AboutComponent from '@/components/articles/AboutComponent.vue'
import ContactComponent from '@/components/articles/ContactComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/articles',
      name: 'ArticlesComponent',
      component: ArticlesComponent,
    },
    {
      path: '/article/:id',
      name: 'EditArticle',
      component: EditArticleComponent,
    },
    {
      path: '/article/details/:id',
      name: 'EditArticleDetailsComponent',
      component: EditArticleDetailsComponent,
    },
    {
      path: '/preview/:id',
      name: 'ArticlePreviewComponent',
      component: ArticlePreviewComponent,
    },
    {
      path: '/finishedArticle/:id',
      name: 'ArticleUserComponent',
      component: ArticleUserComponent,
    },
    {
      path: '/about',
      name: 'AboutComponent',
      component: AboutComponent,
    },
    {
      path: '/contact',
      name: 'ContactComponent',
      component: ContactComponent,
    },
  ],
})

export default router
