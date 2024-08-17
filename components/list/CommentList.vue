<template>
  <transition-group class="flex flex-col gap-6" name="list-b" tag="ul">
    <CommentCard
        v-for="(comment,i) in comments || []"
        :key="comment.id.toString()"
        :comment="comment"
    >
    </CommentCard>
  </transition-group>
</template>
<script lang="ts" setup>
import {type Comment} from "@/models";

defineProps<{ comments?: Comment[] }>()
</script>
