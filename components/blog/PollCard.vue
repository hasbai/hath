<template>
  <ul class="kard mb-1 space-y-2">
    <li v-for="option in blog.pollOptions" class="flex items-center">
      <input :checked="option.liked" :name="option.text"
             class="mr-4 checkbox checkbox-xs checkbox-success"
             type="checkbox" @click="api.like(option)"/>
      <div class="flex-1">
        {{ option.text }}
        <div class="flex items-center">
          <progress :max="displayTotal" :value="option.likes"
                    class="progress progress-primary flex-1 mr-2">
          </progress>
          {{ option.likes }} ({{ (option.likes / total * 100).toFixed(1) }}%)
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {type Blog, PollOption} from "@/models"

const {blog} = defineProps<{ blog: Blog }>()
const api = useAPI()

const supabase = useSupabaseClient()
const toast = useToast()
if (blog.pollOptions.length === 0) {
  const {data, error} = await supabase.from('polls').select()
      .eq('parent_id', blog.id)
      .order('id', {ascending: true})
  if (error) {
    toast.Error(error.message)
  }
  blog.pollOptions.push(...<PollOption[]>data)
}

const total = computed(() =>
    blog.pollOptions.reduce((acc, cur) => acc + cur.likes, 0)
)
const displayTotal = computed(() => {
  const max = Math.max(...blog.pollOptions.map(i => i.likes))
  let result = total.value
  while (result > max << 1) {
    result = result >> 1
  }
  return result
})
</script>


<style scoped>
.kard {
  --tw-shadow: 0 4px 16px -2px rgb(0 0 0 / 0.1);
}

.checkbox:checked {
  background-image: none;
}
</style>