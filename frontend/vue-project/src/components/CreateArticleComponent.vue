<template>
    <div class="create-article">
        <!-- <quill-editor theme="snow" :modules="modules"  :toolbar="full" ref="editor">
            <template #toolbar>
      <div id="my-toolbar">
         Add buttons as you would before 
        <button class="ql-bold" @click="saveArticle">Save</button>
        <button class="ql-italic" @click="emptyArticle">Clear</button>
      </div>
    </template>
        </quill-editor> -->

        <div id="editor-parent">
            <div id="editor" ref="editor"></div>
        </div>
    </div>
</template>

<script>

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
    name: 'CreateArticleComponent',
    mounted() {
        this.quill = new Quill(this.$refs.editor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                     {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                ]
            }
        });
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
#editor-parent{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#editor {
    height: 100%;
    width: 40%;
}
</style>

