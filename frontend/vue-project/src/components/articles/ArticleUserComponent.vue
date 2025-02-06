<template>
    <NavBarComponent />
        <div class="article">
            <div class="Article-content" v-html="initialContent"></div>
        </div>   
</template>
<script>
import { inject } from 'vue';
import Editor from './Editor.vue'; 
import NavBarComponent from './NavBarComponent.vue';


export default {
    name: 'ArticleUserComponent',
    components: {
        Editor,
        NavBarComponent
    },

    data() {
        return {
            articleId: null,
            initialContent: '',
        };
    },

    setup() {
        return {
            articleAdaptor: inject('articleAdaptor'),
        };
    },

    mounted() {
    this.articleId = this.$route.params.id;
    
    if (this.articleId) {
        sessionStorage.setItem('articleId', this.articleId);
    }

    this.loadArticle();     
    },  
    
    methods: {
        async loadArticle() {
            const article = await this.articleAdaptor.getArticle(this.articleId);
            

            this.initialContent = article.content;         
        },
    },
};
</script>



<style scoped>

.article{
    margin: 0 auto;
    width: 40%;
    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 20px;
    position: relative;
}






.button-container{
    position: absolute;
    top: 0;
    right: 0;
}



</style>

