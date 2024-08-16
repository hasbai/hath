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

const loading = ref(false)
const supabase = useSupabaseClient()
const toast = useToast()
const onClick = async () => {
  loading.value = true
  const {
    data,
    status,
    error
  } = await supabase.from('comment').upsert(comment as never).select().single<Comment>()
  loading.value = false
  if (error) {
    toast.Error(error.message)
    return
  }
  console.log(status, data)
  Object.assign(comment, new Comment(data))
}
</script>

<style scoped>

</style>