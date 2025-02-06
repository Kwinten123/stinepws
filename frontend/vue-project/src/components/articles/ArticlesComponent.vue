<template>
    <div class="header">
        <h1>Articles</h1>
         <button id="create" @click="createArticle">Create New Article</button>
    </div>
          
    <div class="articles">
            <div v-for="article in articles" class="article"  :key="article.id">
                <div id="title-container">
                    <h3>{{ article.title }}</h3>
                    <img v-if="article.id !== 1 && article.id !== 2" src="../articles/pngtree-white-edit-icon-image_1338673.jpg" alt="edit title" id="edit-title" @click="editArticleTitle(article.id)">
                </div>
                <p>Last updated on {{ dateformatter(article.lastUpdatedAt) }}</p>
                <p>Last updated by {{ article.author }}</p>
                <button @click="editArticle(article.id)">Edit</button>
                <button v-if="article.id !== 1 && article.id !== 2" id="delete" @click="deleteArticle(article.id)">Delete</button>
            </div>
    </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";




export default {
    name: 'ArticlesComponent',
    setup() {
        const articleAdaptor = inject('articleAdaptor'); // Injecting the ArticleAdaptor
        const articles = ref([]); // Reactive reference for articles
        const router = useRouter(); 


        const getArticles = async () => {
            try {
                const loadedArticles = await articleAdaptor.getArticles(); // Fetch articles
                articles.value = loadedArticles; // Assign fetched articles to the ref
                console.log('Loaded articles:', articles.value);
            } catch (error) {
                console.error('Error loading articles:', error);
            }
        };

        const editArticle = (id) => {
            router.push({ name: 'EditArticle', params: { id } }); // Use the router to navigate
        };

        const deleteArticle = async (id) => {
            const isSure = confirm('Are you sure you want to delete this article?\n\nThis action cannot be undone!'); // Confirm the action
            if (!isSure) return; // If the user cancels, return
            
            try {
                await articleAdaptor.deleteArticle(id); // Delete the article
                articles.value = articles.value.filter(article => article.id !== id); // Remove the article from the list
            } catch (error) {
                console.error('Error deleting article:', error);
            }

            alert('Article deleted successfully!'); // Notify the user
        };

        const dateformatter = (date) => {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        };

        const createArticle = () => {
            router.push({ name: 'EditArticle', params: { id: 'new' } }); // Use the router to navigate
        };

        const editArticleTitle = (id) => {
            router.push({ name: 'EditArticleDetailsComponent', params: { id } }); // Use the router to navigate
        };


        onMounted(() => {
            getArticles(); // Fetch articles when the component is mounted
        });

        return {
            articles, // Expose articles to the template
            editArticle,
            deleteArticle,
            createArticle,
            editArticleTitle,
            dateformatter
        };
    }
};
</script>

<style scoped>

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.articles {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

.article {
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
}

#create {
    background-color: green;
}


#delete {
    margin-left: 10px;
    background-color: red;
}

#edit-title{
    width: 20px;
    height: 20px;
    cursor: pointer;
}

#title-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>
