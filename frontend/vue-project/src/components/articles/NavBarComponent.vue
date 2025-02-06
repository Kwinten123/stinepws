<template>
    <nav class="navbar">
        <ul>
            <li>
                <router-link class="a" :to="{ name: 'AboutComponent' }">About</router-link>
            </li>
            <li>
                <router-link class="a" :to="{ name: 'ContactComponent' }">Contact</router-link>
            </li>

            <li v-if="articleId">
                <router-link class="a" :to="{
                    name: 'ArticleUserComponent',
                    params: { id: articleId }
                }">Current Article</router-link>
            </li>
        </ul>
    </nav>
        
    
</template>

<script>
export default {
    name: 'NavBarComponent',
    data() {
        return {
            articleId: sessionStorage.getItem('articleId'),
        };
    },
}
</script>

<style scoped>
.navbar {
    background-color: var(--primary-pink);
    overflow: hidden;
}

.navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.navbar li {
    float: left;
}

.navbar li .a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    color: black;
}

.navbar li a:hover {
    background-color: var(--primary-purple);
    color: black;
}
</style>