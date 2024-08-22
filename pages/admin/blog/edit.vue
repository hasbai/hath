<template>
  <main class="gap-4">
    <h-img :src="`/api/image?hash=${blog.id}`" alt="background image"
           class="rounded-2xl" style="height: 30vh"/>
    <input v-model="blog.title" :placeholder="$t('title-placeholder')"
           class="text-2xl text-center my-6">
    <Editor v-model="blog.text" :placeholder="$t('blog-placeholder')"/>
    <div>
      <label class="label" for="image-input">{{ $t('images') }}</label>
      <ImageDisplay :images="blog.images"/>
    </div>
    <button class="btn btn-primary" @click="onClick">
      <span v-show="loading" class="absolute loading loading-spinner"></span>
      <span :class="{'opacity-0': loading}">Submit</span>
    </button>
    <div class="extra">
      <div>
        <label class="label" for="tag-name-input">{{ $t('tags') }}</label>
        <TagInput v-model="blog.tags"/>
      </div>
      <!--      <label class="label cursor-pointer">-->
      <!--        <span class="label-text">Anonymous</span>-->
      <!--        <input v-model="blog.anonymous" class="toggle toggle-primary" name="anonymous"-->
      <!--               type="checkbox"/>-->
      <!--      </label>-->
    </div>
  </main>
</template>
<script lang="ts" setup>
import Editor from "~/components/blog/Editor.vue";
import {Blog, Tag} from "@/models";
import ImageDisplay from "@/components/comment/ImageDisplay.vue";

definePageMeta({
  keepalive: true
})

const blog = reactive(new Blog({}))

const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)

const _tags: Tag[] = Object.assign([], blog.tags) // original tags
const onClick = async () => {
  loading.value = true
  const tags = blog.tags || []
  const tasks = []

  // update blog
  const {error} = await supabase.from('blog').upsert(blog as never)
  if (error) {
    toast.Error(error.message)
    loading.value = false
    return
  }

  // update tag relations
  const a = _tags.map((tag: Tag) => tag.id)
  const b = tags.map((tag: Tag) => tag.id)
  if (a.length !== b.length ||
      !a.every((element, index) => element === b[index])) {
    if (a.length > 0) {
      tasks.push(supabase.from('blog_tag').delete().eq('blog_id', blog.id))
    }
    if (b.length > 0) {
      tasks.push(supabase.from('blog_tag').insert(tags.map((tag) => {
        return {
          blog_id: blog.id,
          tag_id: tag.id
        } as never
      })))
    }
  }

  // make requests
  const results = await Promise.all(tasks)
  if (results.some((result) => result.error)) {
    toast.Error('Failed to send')
    loading.value = false
    return
  }
  toast.Success('Success')
  emit('success')
  dialog.value?.close()
  loading.value = false
  Object.assign(blog, new Blog({parent_id: props.parent_id}))
}
</script>