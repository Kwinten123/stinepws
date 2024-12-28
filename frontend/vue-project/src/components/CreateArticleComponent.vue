<template>
    <div class="create-article">
        <quill-editor theme="snow" :modules="modules"  :toolbar="full" ref="editor">
            <template #toolbar>
      <div id="my-toolbar">
        <!-- Add buttons as you would before -->
        <button class="ql-bold" @click="saveArticle">Save</button>
        <button class="ql-italic" @click="emptyArticle">Clear</button>
      </div>
    </template>
        </quill-editor>
    </div>
</template>

<script>



import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ImageDrop } from 'quill-image-drop-module';








export default {
    name: 'CreateArticleComponent',
    components: {
    QuillEditor
    },
    setup: () => {
        const modules = {
            name: 'ImageDrop',
            module: ImageDrop,           
        }
       return { modules }
    },
  

/**
 * getContents(index, length)
Parameter: index?: number, length?: number

Return: content: string | Delta

Returns the contents of the editor.


 */
    methods: {
        saveArticle() {
            const proceed = confirm('Are you sure you want to save the article?\n\nYou can edit this later.');
            const content = this.$refs.editor.getContents();

            if (!proceed) return

            console.log(content);
            //TODO - implement save article logic
            
        },
        emptyArticle() {
            const proceed = confirm('Are you sure you want to empty the article?');
            if (!proceed) return

            this.$refs.editor.setContents('');
        }
    }
}

</script>

<style scoped>
.editor {
    height: 400px;
}
</style>

