<template>
  <CommentCard :comment="reply" class="comment-reply shadow-lg my-2" @click="onClick">
  </CommentCard>
</template>

<script lang="ts" setup>
import CommentCard from "@/components/comment/CommentCard.vue"
import {Comment, UUID} from "@/models";

const {parent_id, reply_to} = defineProps<{
  parent_id: UUID,
  reply_to: UUID,
}>()
const comments = commentStore()
const reply = reactive({} as Comment)
let data = comments.list(parent_id).find((p) => p.id.equals(reply_to))
if (!data) data = await comments.get(reply_to)
delete data?.reply_to
Object.assign(reply, data)

const onClick = () => {
  const el = document.getElementById(reply_to.toString())
  el?.scrollIntoView({behavior: 'smooth', block: 'center'})
  el?.focus({preventScroll: true})
  // el?.style.setProperty('border', '2px solid oklch(var(--p))')
  // setTimeout(() => el?.style.removeProperty('border'), 1000)
}
</script>

<style>
.comment-reply {
  --tw-shadow: 0 -2px 12px 4px rgb(0 0 0 / 0.1);
}

.comment-reply:hover {
  --tw-shadow: 0 -2px 12px 4px rgb(0 0 0 / 0.1);
}

.comment-reply .fold-content {
  display: none;
}

dialog .comment-reply {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>