<script>
import { RouterView } from 'vue-router'
import { ArticleAdaptor } from '@/adaptors/ArticleAdaptor.js'
import { appConfig } from './config/apiConfig.js'
import { provide } from 'vue'

export default {
  name: 'app-component',

  setup() {
    const articleAdaptor = new ArticleAdaptor(appConfig.BACKEND_URL + '/articles');
    provide('articleAdaptor', articleAdaptor);
    return {
      articleAdaptor
    };
  }
};
</script>

<template>

  
      <RouterView />
  
</template>

<style scoped>


</style>
