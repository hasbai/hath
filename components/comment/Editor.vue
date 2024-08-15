<template>
  <div ref="editor" class="form-control space-y-4">
    <Reply v-if="comment.reply_to" :parent_id="comment.parent_id" :reply_to="comment.reply_to"
           class="my-0">
    </Reply>
    <div>
      <label class="label">Text</label>
      <textarea v-model="comment.text" class="textarea textarea-bordered h-48 w-full"
                name="comment-text-input"
                placeholder="Write something..."/>
    </div>
    <div>
      <label class="label">Images</label>
      <input ref="fileInput" accept="image/*" class="file-input w-full max-w-xs"
             multiple name="comment-image-input" type="file"
             @change="onFileInputChange"/>
      <ImageDisplay v-if="comment.images && comment.images.length>0" :images="comment.images"
                    class="mt-2"/>
    </div>
    <label class="label cursor-pointer">
      <span class="label-text">Anonymous</span>
      <input v-model="comment.anonymous" class="toggle toggle-primary" name="anonymous"
             type="checkbox"/>
    </label>
  </div>
</template>

<script lang="ts" setup>
import type {Comment} from "@/models";
import ImageDisplay from "@/components/comment/ImageDisplay.vue";
import Reply from "@/components/comment/Reply.vue";

const {comment} = defineProps<{ comment: Comment }>();
const supabase = useSupabaseClient()
const toast = useToast()
const fileInput = ref<HTMLInputElement | null>(null)
const onFileInputChange = async () => {
  const files = fileInput.value?.files
  if (!files) return
  for (let file of files) {
    const uid = await hash(file)
    const {error} = await supabase.storage.from('image').upload(uid, file)
    if (error && (<any>error).statusCode != '409') {
      toast.Error(error.message)
      console.error(error)
    } else {
      toast.info('Image uploaded: ' + uid)
      comment.images?.push(`/storage/v1/object/public/image/${uid}`)
    }
  }
}

const hash = async (file: File) => {
  try {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer())
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replaceAll('+', '-')
        .replaceAll('/', '_')
  } catch (e) {
    console.error('Failed to hash file, use UUID instead. ', e)
    return crypto.randomUUID()
  }
}

</script>