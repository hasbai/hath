<template>
  <div class="flex justify-end items-center space-x-1">
    <label>最新回复</label>
    <input v-model="byID" class="toggle toggle-primary text-primary" name="order-toggle"
           type="checkbox"/>
    <label>最新发帖</label>
  </div>
</template>

<script lang="ts" setup>
const order = defineModel()

const byID = ref(false)
watch(byID, () => {
  order.value = byID.value ? 'id' : 'updated_at'
})
</script>
