<template>
    <div class="button-container">
                <button class="user-button" @click="navigateToUserSide">Article on the userside</button>
                <button @click="togglePreview">See preview</button>
                <button class="save-button" @click="saveArticle">Save</button>
                <button class="cancel-button" @click="cancelArticle">Cancel</button>
            </div>
    
        <div class="create-article">
        

                <Editor ref="editor" :initialContent="initialContent" @update:content="handleContentUpdate"/>
        </div>
    
</template>
<script>
import { inject } from 'vue';
import Editor from './Editor.vue'; 


export default {
    name: 'CreateArticleComponent',
    components: {
        Editor,
    },

    data() {
        return {
            articleId: null,
            initialContent: '',
            currentContent: '',
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

            window.addEventListener('beforeunload', this.handleBeforeUnload); 
    },
    methods: {
        async loadArticle() {
            if (this.articleId === 'new') {
                this.$router.push({ name: 'EditArticleDetailsComponent', params: { id: 'new' } });
                return;
            }

            const article = await this.articleAdaptor.getArticle(this.articleId);
            

            this.initialContent = article.content;         
        },

        handleBeforeUnload(event) {
            if (this.currentContent !== this.initialContent) {
                event.preventDefault();
                event.returnValue = ''; 
            }
        },
    
        async saveArticle() {
            const currentArticle = await this.articleAdaptor.getArticle(this.articleId);

            console.log(currentArticle);
            

            const content = this.currentContent; //TODO get the content of the tiptap editor

            const author = sessionStorage.getItem('username');

            console.log(`Saving article ${this.articleId}`, content);

        
                const article = {
                    id: this.articleId,
                    title: currentArticle.title,
                    content: content,
                    author: author,
                    lastUpdatedAt: new Date(),
                };
            const updatedArticle = await this.articleAdaptor.updateArticle(article);

                this.currentContent = updatedArticle.content;
            

            alert('Article saved successfully');
            // this.$router.push({ name: 'ArticlesComponent' });
        },
        cancelArticle() {
            if (confirm('Are you sure you want to cancel and go back to the overview?\n\nUnsaved changes will be lost.')) {
                this.$router.push({ name: 'ArticlesComponent' });
            }
        },
        togglePreview() {
            this.$router.push({
                name: 'ArticlePreviewComponent', 
                params: { id: this.articleId },
            });
        },
        navigateToUserSide() {
            this.$router.push({
                name: 'ArticleUserComponent', 
                params: { id: this.articleId },
            });
        },
        handleContentUpdate(content) {
            this.currentContent = content;
        },
    },
     beforeRouteLeave(to, from, next) {
        if (this.currentContent !== this.initialContent) {
            const answer = confirm(
                "NOTE*\n\nDid you save your changes?\n\nUnsaved changes will be lost.\n\nDo you want to proceed?"
                
            );
            if (!answer) {
                next(false);
            } else {
                next();
            }
        } else {
            next();
        }
    },

    umounted() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
};


</script>



<style scoped>




.editor-container{
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    width: 90%;
}

.create-article{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
}




.save-button{
    padding: 10px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
}

.clear-button{
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
}



.cancel-button{
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.button-container{
    position: absolute;
    top: 1rem;
    right: 1rem;
}

.button-container button{
    margin-left: 10px;
}
</style>

