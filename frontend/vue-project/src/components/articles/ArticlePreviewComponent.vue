<template>
    <div class="button-container">
                <button @click="toggleEditview">Edit article</button>
            </div>
    
        <div class="article">
            <div class="Article-content" v-html="initialContent"></div>
        </div>
    
</template>
<script>
import { inject } from 'vue';
import Editor from './Editor.vue'; 


export default {
    name: 'ArticlePreviewComponent',
    components: {
        Editor,
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
        
        this.loadArticle();     
    },
    methods: {
        async loadArticle() {
            const article = await this.articleAdaptor.getArticle(this.articleId);
            
            this.initialContent = article.content;         
        },
    
        toggleEditview() {
            this.$router.push({ name: 'EditArticle', params: { id: this.articleId } });
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

