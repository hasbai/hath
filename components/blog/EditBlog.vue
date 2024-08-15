<template>
  <dialog id="edit_blog" ref="dialog" class="modal">
    <div class="modal-box text-base bg-base-100">
      <h2 class="text-lg font-medium mb-2">{{ blog.text ? '修改' : '发送' }}树洞</h2>
      <div>
        <label class="label" for="tag-name-input">Tags</label>
        <TagInput v-model="blog.tags"/>
      </div>
      <Editor :comment="blog"/>
      <PollEditor :blog="blog"/>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn mr-4">Close</button>
        </form>
        <button class="btn btn-primary" @click="onClick">
          <span v-show="loading" class="absolute loading loading-spinner"></span>
          <span :class="{'opacity-0': loading}">Submit</span>
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import {Blog, Tag, toJSONArray, UUID} from "@/models";
import Editor from "@/components/comment/Editor.vue";
import PollEditor from "@/components/blog/PollEditor.vue";

const props = defineProps<{ parent_id?: string, blog?: Blog }>()
const emit = defineEmits(['success'])
const blog = reactive(new Blog({
  parent_id: props.parent_id,
}))

watch(() => props.parent_id, (_new) => {
  blog.parent_id = new UUID(_new)
})

if (props.blog) Object.assign(blog, props.blog)

const supabase = useSupabaseClient()
const bus = useToast()
const loading = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)

const _tags: Tag[] = Object.assign([], blog.tags) // original tags
const onClick = async () => {
  loading.value = true
  const tags = blog.tags || []
  const tasks = []

  // create poll options TODO: update poll options
  const pollOptions = blog.pollOptions.filter(i => i.text)
  if (pollOptions.length > 0) {
    blog.type = 'poll'
    tasks.push(supabase.from('poll').upsert(toJSONArray(pollOptions) as never))
  }

  // update blog
  const {error} = await supabase.from('blog').upsert(blog as never)
  if (error) {
    bus.Error(error.message)
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
    bus.Error('Failed to send')
    loading.value = false
    return
  }
  bus.Success('Success')
  emit('success')
  dialog.value?.close()
  loading.value = false
  Object.assign(blog, new Blog({parent_id: props.parent_id}))
}
</script>

<style scoped>

</style>