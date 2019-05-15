<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="btn-toolbar mb-3" role="toolbar">
        <div class="btn-group btn-group-sm mx-2 mb-4" role="group">

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <i class="fas fa-bold"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <i class="fas fa-italic"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <i class="fas fa-strikethrough"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <i class="fas fa-underline"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <i class="fas fa-paragraph"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <i class="fas fa-list-ul"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <i class="fas fa-list-ol"></i>
          </button>

          <button
            class="btn btn-secondary"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <i class="fas fa-code"></i>
          </button>

          <button
            class="btn btn-secondary"
            @click="commands.horizontal_rule"
          >
            <i class="fas fa-minus"></i>
          </button>

          <button
            class="btn btn-secondary"
            @click="commands.undo"
          >
            <i class="fas fa-undo"></i>
          </button>

          <button
            class="btn btn-secondary"
            @click="commands.redo"
          >
            <i class="fas fa-redo"></i>
          </button>

        </div>
      </div>
    </editor-menu-bar>

    <editor-content :editor="editor"/>
  </div>
</template>

<script>
import _ from 'lodash'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editedNote: {},
      editor: new Editor({
        extensions: [
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyClass: 'is-empty',
            emptyNodeText: 'Write something here …',
            showOnlyWhenEditable: true,
          }),
        ],
        onUpdate: ({ getHTML }) => {
          this.editedNote.content = getHTML()
          this.saveNote()
        }
      }),
    }
  },
  methods: {
    saveNote: _.debounce( function() { this.updateNote() }, 500),
    updateNote() {
      if (this.editedNote.content) { this.$store.dispatch('updateNote', this.editedNote) }
    }
  },
  mounted() {    
    this.editedNote.id = this.$store.state.projectNotes.id
    this.editor.setContent(this.$store.state.projectNotes.content)
  },
  beforeDestroy() {
    if (this.editedNote.content) { this.$store.dispatch('updateNote', this.editedNote) }    
    this.editor.destroy()
  },
}
</script>

<style>
.editor p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
