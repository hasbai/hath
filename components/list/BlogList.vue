<template>
  <transition-group
      class="blog-list relative space-y-6 lg:space-y-8"
      name="list" tag="div"
  >
    <BlogCard
        v-for="blog in contents"
        :key="blog.id.toString()"
        :blog="blog"
        class="w-full simple"
    />
  </transition-group>
  <Loader v-model="loading" @intersect="load"></Loader>
</template>

<script lang="ts" setup>
import Loader from "@/components/Loader.vue";
import {Blog} from "@/models";

const {loadFunction} = defineProps<{ loadFunction: Function }>()
const PAGE_SIZE = 20
const contents = reactive<Blog[]>([])
const loading = ref(true)
let lock = false
const load = async (ascending = false) => {
  if (lock) return
  lock = true
  loading.value = true
  const data = await loadFunction(contents, ascending)
  if (ascending) contents.unshift(...data)
  else contents.push(...data)
  if (data.length < PAGE_SIZE) {
    loading.value = false
  }
  lock = false
}

const reload = () => {
  contents.length = 0
  load()
}
defineExpose({load, reload})
</script>