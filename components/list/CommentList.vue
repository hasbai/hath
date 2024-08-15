<template>
  <transition-group class="flex flex-col gap-6" name="list" tag="ul">
    <CommentCard
        v-for="(comment,i) in comments"
        :key="comment.id.toString()"
        :comment="comment"
    >
    </CommentCard>
  </transition-group>
</template>
<script lang="ts" setup>
import {Comment} from "@/models";

const props = defineProps<{ parent_id: string }>()
const comments = <Array<Comment>>[]
const supabase = useSupabaseClient()
const {data, error} = await supabase
    .from('comments')
    .select()
    .eq('parent_id', props.parent_id)
    .order('id', {ascending: true})
comments.push(...Comment.fromArray<Comment>(data!))
</script>
