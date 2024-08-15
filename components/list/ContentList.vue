<template>
  <transition-group class="w-full relative space-y-6" name="list" tag="div">
    <nuxt-link v-for="(content, i) in contents"
               :key="content.id"
               :to="to(content)"
               class="block">
      <CommentCard :comment="content" :i="i+1" class="w-full simple">
        <template v-if="page === 'search'" #left>
          <span class="tooltip" data-tip="排序得分">
            <Icon class="relative" name="material-symbols:weight-outline"/>
            {{ content.rank?.toFixed(3) }}
          </span>
        </template>
      </CommentCard>
    </nuxt-link>
  </transition-group>
  <Loader v-model="loading" @intersect="load"></Loader>
</template>
<script lang="ts" setup>
import type {Content} from "@/models";

const {loadFunction} = defineProps<{ loadFunction: Function, page?: string }>()

const PAGE_SIZE = 50
const contents = reactive<Content[]>([])
const loading = ref(true)
let lock = false
const load = async () => {
  if (lock) return
  lock = true
  loading.value = true
  const data = await loadFunction(contents)
  contents.push(...data)
  if (data.length < PAGE_SIZE) {
    loading.value = false
  }
  lock = false
}

const reload = () => {
  contents.length = 0
  load()
}
defineExpose({reload})

const to = (content: Content) => {
  switch (content.type) {
    case 'blog':
    case 'poll':
      return `/blogs/${content.id}`
    case 'comment':
    case 'poll_option':
      return `/blogs/${content.parent_id}#${content.id}`
    default:
      return ''
  }
}
</script>
