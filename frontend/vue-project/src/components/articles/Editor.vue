<template>
  <div class="editor-container">
    <div v-if="editor" class="toolbar">

        <div class="headers-and-styles">
            <div class="headers">
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                H1
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                H2
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                H3
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                H4
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                H5
            </button>
        </div>

          <div class="styles">
            <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
          Underline
          </button>
                <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            Bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            Italic
        </button>
        </div>

        
    
    <div class="lists-and-alignment">
        <div class="lists">
            <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                Bullet List
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                Ordered List
            </button>
        </div>

        <div class="alignment">
        <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
            Left Align
        </button>
        <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            Center Align
        </button>
        <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            Right Align
        </button>
        <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
            Justify
        </button>
        </div>
    </div>

    <div class="colors">
        <button @click="editor.chain().focus().setColor('#A359A0').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#FAF594' })}">
          Purple
        </button>
        <button @click="editor.chain().focus().setColor('#E99FBD').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#70CFF8' })}">
          Pink
        </button>
        <button @click="editor.chain().focus().setColor('#6EADFF ').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#94FADB' })}">
          Blue
        </button>
        <button @click="editor.chain().focus().setColor('#E7E7E7').run()" :class="{ 'is-active': editor.isActive('textStyle', { color: '#B9F18D' })}">
          Grey
        </button>
        <button @click="editor.chain().focus().unsetColor().run()">
          Unset color
        </button>
    </div>
    <div class="actions">
        <button @click="editor.chain().focus().undo().run()">
          Undo
        </button>
        <button @click="editor.chain().focus().redo().run()">
          Redo
        </button>
    </div>

      <input type="file" @change="handleImageUpload" accept="image/*" />
  </div>

    <editor-content class="editor" :editor="editor" />
  </div>
</div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'

export default {
  components: {
    EditorContent,
    },

  props: {
    initialContent: {
      type: String,
      default: '',
    },
    },

  emits: ['update:content'],

  data() {
    return {
      editor: null,
    };
    },

    watch: {
        initialContent: {
            immediate: true,
        handler(newContent) {
              console.log('newContent:', newContent);             
                if (this.editor && newContent !== this.editor.getHTML()) {
                    this.editor.commands.setContent(newContent);
                }
            },
        },
  },

  mounted() {
    this.editor = new Editor({
      content: this.initialContent,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Image.configure({
          allowBase64: true,
        }),
        Underline,
        TextStyle,
        Color,
                    
        ],
        onUpdate: () => {
            this.$emit('update:content', this.editor.getHTML());
      },
        
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  methods: {
    // Handle image upload
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Insert the image into the editor
          this.editor.chain().focus().setImage({
            src: e.target.result,
            width: "400px"
          }).run();
        };
        reader.readAsDataURL(file);
      }
    },
  },
  
};
</script>

<style>

.toolbar {
    margin-bottom: 10px;
    color: black;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 10px;
    width: 100%;
}

.headers-and-styles{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: row;
}

.lists-and-alignment{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: row;
}

.underline{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: row;
}

.colors{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: row;
}

.toolbar button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.toolbar button.is-active {
  background-color: var(--primary-pink);
}

input[type="file"] {
  margin-left: 10px;
}

.editor{
    width: 100%;
    height: 72vh;
    border: 1px solid #ccc;
    overflow: auto;
    padding: 10px;
}

.tiptap:focus-visible{
    outline: none;
    box-shadow: none;
}

img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;
}
</style>