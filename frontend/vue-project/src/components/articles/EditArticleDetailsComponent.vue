<template>
    <div class="edit-article-container">
        <label for="Title" class="input-label">Title</label>
        <input
            type="text"
            id="Title"
            v-model="article.title"
            class="input-field"
            placeholder="Enter article title"
        />
        <p>*The title will only be for internal use. It won't be displayed on the user's side.</p> 

        <div class="button-container">
            <button class="cancel-button" @click="cancelArticle">Cancel</button>
            <button class="save-button" @click="saveArticle">Save</button>
        </div>
    </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Article } from '@/models/Article';
import router from '@/router';

export default {
    name: 'EditArticleDetailsComponent',

    setup() {
        const route = useRoute();
        const articleAdaptor = inject('articleAdaptor');
        const article = ref(new Article('new')); // Initialize with a default article

        const loadArticle = async () => {
            const articleId = route.params.id;
            if (articleId === 'new') {
                article.value = {
                    id: null,
                    title: "",
                    content: "",
                    author: sessionStorage.getItem('username'),
                    lastUpdatedAt: new Date(),
                }; // Create a new article
            } else {
                article.value = await articleAdaptor.getArticle(articleId); // Fetch existing article
            }
        };

        const saveArticle = async () => {
            article.value.lastUpdatedAt = new Date();
            article.value.title = article.value.title.trim();



            if (route.params.id !== 'new') {
                await articleAdaptor.updateArticle(article.value);
                router.push({ name: 'ArticlesComponent' }); // Use the router to navigate
                return;
            } 
          
            const newArticle = await articleAdaptor.saveArticle(article.value);
            const articleId = newArticle.id;
            router.push({ name: 'EditArticle', params: { id: articleId } }); // Use the router to navigate
        };

        const cancelArticle = () => {
            router.push({ name: 'ArticlesComponent' }); 
        };

        onMounted(() => {
            loadArticle(); // Load article when the component is mounted
        });

        return {
            article,
            saveArticle,
            cancelArticle,
        };
    },
};
</script>

<style scoped>

.button-container {
    display: flex;
    justify-content: right;
    margin-top: 20px;
    gap: 10px;
}
.save-button{
    margin-top: 20px;
    padding: 10px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cancel-button{
    margin-top: 20px;
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.edit-article-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #1f2937; /* Dark gray background */
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Darker shadow */
    top: 50%;     
    left: 50%;     
    transform: translate(-50%, -50%);
    position: absolute;
}

.edit-article-container p{
    color: #9ca3af;
    font-size: 0.7rem;
}

.input-label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #f3f4f6; /* Light gray text */
    margin-bottom: 0.5rem;
}

.input-field {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: #f3f4f6; /* Light gray text */
    background-color: #374151; /* Darker gray background */
    border: 1px solid #4b5563; /* Gray border */
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
    border-color: #3b82f6; /* Blue focus border */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); /* Blue shadow */
}

.input-field::placeholder {
    color: #9ca3af; /* Light gray placeholder */
}
</style>