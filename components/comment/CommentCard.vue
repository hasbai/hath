<template>
  <div class="comment">
    <Reply v-if="comment.reply_to && !comment.reply_to.equals(comment.id)"
           :parent_id="comment.parent_id" :reply_to="comment.reply_to">
    </Reply>
    <div class="flex flex-col">
      <user-badge v-if="comment.user" :user="comment.user">
        <span class="caption"><client-only>
          {{ comment.id.getTime().toLocaleString() }}
        </client-only></span>
      </user-badge>
      <div class="text px-4 py-1" v-html="$mdRenderer.render(comment.text)"></div>
    </div>
    <!--    <div class="fold-content flex flex-row justify-around space-x-2">-->

    <!--      <button class="btn btn-sm btn-primary"-->
    <!--              @click="comments.edit(new Comment({-->
    <!--                parent_id: isBlog ? comment.id : comment.parent_id,-->
    <!--                reply_to: isBlog ? undefined : comment.id-->
    <!--                }))">-->
    <!--        <Icon name="mdi:comment-text"></Icon>-->
    <!--      </button>-->
    <!--      <button v-if="isMe" class="btn btn-sm btn-primary" @click="comments.edit(comment)">-->
    <!--        <Icon name="mdi:edit"></Icon>-->
    <!--      </button>-->
    <!--      <button v-if="isMe" class="btn btn-sm btn-warning" @click="comments.softDelete(comment)">-->
    <!--        <Icon name="mdi:delete"></Icon>-->
    <!--      </button>-->
    <!--      <button v-if="isAdmin" class="btn btn-sm btn-error" @click="comments.del(comment)">-->
    <!--        <Icon name="mdi:delete"></Icon>-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import {Comment} from '@/models'
import Reply from "@/components/comment/Reply.vue";

const {comment, isBlog} = defineProps<{
  comment: Comment,
  i?: Number,
  isBlog?: Boolean,
}>()
const {$mdRenderer} = useNuxtApp()
const loading = ref(false)


const isMe = ref(comment.is_me)
</script>
