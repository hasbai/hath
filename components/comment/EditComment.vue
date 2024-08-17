<template>
  <div class="flex flex-col gap-2">
    <textarea v-model="comment.text"
              :placeholder="$t('comment-placeholder')"
              class="textarea textarea-bordered h-24 w-full max-w-full"
              name="comment-text-input"/>
    <button class="btn btn-primary self-end relative min-w-24" @click="onClick">
      <loader :loading="loading">
        <icon name="mdi:send" size="1.5em"></icon>
      </loader>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {Comment} from "@/models";

const {comment} = defineProps<{ comment: Comment }>()
const emit = defineEmits(['created'])

const loading = ref(false)
const supabase = useSupabaseClient()
const toast = useToast()
const onClick = async () => {
  loading.value = true
  const {
    status,
    error
  } = await supabase.from('comment').upsert(comment as never)
  if (error) {
    toast.Error(error.message)
    loading.value = false
    return
  }
  if (status === 201) {
    const {data, error} = await supabase.from('comments').select().eq('id', comment.id).single()
    if (error) {
      toast.Error(error.message)
      loading.value = false
      return
    }
    emit('created', new Comment(data))
  }
  loading.value = false
  Object.assign(comment, new Comment({parent_id: comment.parent_id}))
  console.log(comment.parent_id.toString())
}
</script>

<style scoped>

</style>