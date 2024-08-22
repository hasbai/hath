<template>
  <div v-if="editor" class="flex flex-col gap-2 w-full min-h-half sm:rounded-lg">
    <div
        class="sticky top-0 z-10 flex justify-between text-neutral-500 focus:outline-none
        toolbar py-0 text-2xl"
    >
      <div class="flex flex-wrap items-center gap-1.5">
        <Icon class="btn-icon" name="material-symbols:format-h1-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-h2-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-h3-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-bold-rounded"
              @click="editor.chain().focus().toggleBold().run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-italic-rounded"
              @click="editor.chain().focus().toggleItalic().run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-quote-rounded"
              @click="editor.chain().focus().toggleBlockquote().run()"
        />
        <Icon class="btn-icon" name="bx:code-block"
              @click="editor.chain().focus().toggleCodeBlock().run()"
        />
        <Icon class="btn-icon" name="material-symbols:ink-highlighter-outline-rounded"
              @click="editor.chain().focus().toggleHighlight().run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-align-left-rounded"
              @click="editor.chain().focus().setTextAlign('left').run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-align-center-rounded"
              @click="editor.chain().focus().setTextAlign('center').run()"
        />
        <Icon class="btn-icon" name="material-symbols:format-align-right-rounded"
              @click="editor.chain().focus().setTextAlign('right').run()"
        />
        <label class="flex items-center">
          <Icon class="btn-icon" name="mdi:image-add-outline"/>
          <input
              accept=".jpeg,.jpg,.png,image/jpeg,image/png,image/gif"
              class="sr-only"
              type="file"
              @change="uploadImage"
          />
        </label>
      </div>
      <div class="flex flex-wrap items-center justify-around gap-2">
        <Icon class="btn-icon" name="material-symbols:undo"
              @click="editor.chain().focus().undo().run()"
        />
        <Icon class="btn-icon" name="material-symbols:redo"
              @click="editor.chain().focus().redo().run()"
        />
        <div class="text-sm">
          <span class="font-bold text-center text-teal-600">
            {{ editor.storage.characterCount.words() }}
          </span>
          <span> words</span>
        </div>
      </div>
    </div>
    <article class="editor flex-1 w-full h-full overflow-y-auto">
      <editor-content :editor="editor" class="h-full"/>
      <!-- add link -->
      <div
          v-if="showAddLink"
          class="absolute top-0 z-10 w-full p-2 pb-4 bg-white border shadow-xl dark:bg-stone-800 border-stone-700 "
          tabindex="0"
          @keydown.esc="showAddLink = !showAddLink"
      >
        <div class="relative px-2">
          <label class="text-sm text-stone-500"
          >Paste a URL

            <input
                v-model="urlLink"
                v-focus
                class="form-input"
                placeholder="https://www.example.com/"
                type="url"
            />
            <button
                :class="{ 'is-active': editor.isActive('link') }"
                class="absolute px-3 py-1 text-sm font-semibold uppercase bg-white rounded top-1/2 right-5 "
                @click="addLink"
            >
              add
            </button>
          </label>
        </div>
      </div>
    </article>
    <div class="relative">
      <bubble-menu
          v-if="editor"
          :editor="editor"
          :tippy-options="{ duration: 100 }"
          class="flex items-center px-2 py-1 space-x-2 bg-white border rounded shadow border-stone-300 dark:border-stone-700 "
      >
        <Icon class="btn-icon" name="mdi:link-variant"
              @click="addLink"
        />
        <Icon class="btn-icon" name="bx:code-block"
              @click="editor.chain().focus().toggleCode().run()"
        />
      </bubble-menu>
    </div>
  </div>
</template>

<script setup>
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import {BubbleMenu, EditorContent, useEditor} from "@tiptap/vue-3";
import {Markdown} from '@hasbai/tiptap-markdown';
import {Typography} from "@tiptap/extension-typography";
import {Mathematics} from "@tiptap-pro/extension-mathematics";
import 'katex/dist/katex.min.css'

const props = defineProps(['modelValue', 'placeholder']);
const emit = defineEmits(['update:modelValue']);
const showAddYTLink = ref("");
const showAddLink = ref("");
const ytLink = ref("");
const urlLink = ref("");

const vFocus = {
  mounted: (el) => el.focus(),
};

const unescape = (markdown) => {
  return markdown.replace(/\\([`*\\~\[\]_])/g, '$1')
}

const WordCount = CharacterCount.extend({
  onBeforeCreate() {
    this.storage.characters = options => {
      // use words only, for better performance
      return 0
    }

    this.storage.words = options => {
      const node = options?.node || this.editor.state.doc
      const text = node.textBetween(0, node.content.size, ' ', ' ')
      const cn = text.match(/\p{sc=Han}/gu) || '';
      const en = text.replace(/[^\w-]/g, ' ').split(/\s+/).filter(w => {
        return ['', '-', '_'].indexOf(w.trim()) === -1
      })
      return cn.length + en.length
    }
  },
});

const editor = useEditor({
  extensions: [
    StarterKit,
    Markdown,
    Image,
    Link.configure({openOnClick: false}),
    TextAlign.configure({types: ["heading", "paragraph"]}),
    Highlight,
    Typography,
    WordCount,
    Youtube,
    Mathematics,
    Placeholder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: ({node}) => props.placeholder,
    }),
  ],
  editorProps: {
    attributes: {
      class:
          "prose focus:outline-none dark:bg-stone-800",
    },
  },
  content: props.modelValue,
  autofocus: true,
  onUpdate: ({editor}) => {
    emit("update:modelValue", editor.storage.markdown.getMarkdown())
  },
});

const readData = (f) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(f);
  });
};

const uploadImage = async (event) => {
  let file = event.target.files[0];
  // editor.value.chain().focus().setImage({src: res.secure_url}).run();
};

// add YouTube video
const addVideo = (url) => {
  if (ytLink.value) {
    editor.value.commands.setYoutubeVideo({
      src: ytLink.value,
    });
    ytLink.value = "";
    showAddYTLink.value = false;
  }
};

// add URL video
const addLink = (url) => {
  const previousUrl = editor.value.getAttributes("link").href;
  // console.log(previousUrl)

  if (previousUrl) {
    editor.value.commands.unsetLink({
      href: urlLink.value,
    });
    return;
  }

  showAddLink.value = !showAddLink.value;

  if (urlLink.value) {
    editor.value.commands.setLink({
      href: urlLink.value,
    });
    urlLink.value = "";
    showAddLink.value = false;
  }
};
</script>

<style>
.ProseMirror {
  min-height: 30vh;
}

.Tiptap-mathematics-editor {
  font-family: var(--font-mono);
  padding: 0.25rem;
}

.Tiptap-mathematics-render {
  padding: 0 0.25rem;

  &--editable {
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #eee;
    }
  }
}

.Tiptap-mathematics-editor,
.Tiptap-mathematics-render {
  border-radius: 0.25rem;
  display: inline-block;
}

.toolbar {
  background: var(--bc);
}

.editor::-webkit-scrollbar {
  width: 6px;
}

.editor::-webkit-scrollbar-track {
  background: #f3f3f3;
  border-radius: 2px;
}

.editor::-webkit-scrollbar-thumb {
  background: rgb(210, 210, 210);
  border-radius: 8px;
}

.editor::-webkit-scrollbar-thumb:hover {
  background: rgb(180, 180, 180);
}

.editor::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>