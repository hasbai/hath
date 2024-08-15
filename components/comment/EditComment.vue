<template>
  <dialog id="edit_comment" ref="dialog" class="modal">
    <div class="modal-box text-base">
      <h2 class="text-lg font-medium mb-2">
        {{ comments.current.reply_to ? '回复' : comments.current.text ? '修改' : '发送' }}帖子
      </h2>
      <Editor :comment="comments.current"/>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn mr-4">Close</button>
          <button class="btn btn-warning mr-4" @click="comments.dropDraft">Drop draft</button>
        </form>
        <button class="btn btn-primary" @click="onClick">
          <span v-show="loading" class="absolute loading loading-spinner"></span>
          <span :class="{'opacity-0': loading}"> Submit </span>
        </button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import Editor from "@/components/comment/Editor.vue";

const comments = commentStore()

const loading = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)
const onClick = async () => {
  loading.value = true
  await comments.upsert()
  loading.value = false
  dialog.value?.close()
}
</script>

<style scoped>

</style>