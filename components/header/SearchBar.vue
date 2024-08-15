<template>
  <button class="btn btn-ghost" @click="showModal">
    <Icon name="mdi:magnify" size="1.5rem"/>
  </button>
  <dialog id="search_bar" ref="dialog" class="modal">
    <div class="modal-box fixed flex items-center p-4">
      <input id="search-input" v-model="query"
             class="input input-bordered w-full" name="search-input" placeholder="Search"
             type="text" @keydown.enter.prevent="search"/>
      <label class="absolute right-6" for="search-input">
        <button class="btn btn-ghost btn-sm px-1" @click="search">
          <Icon name="mdi:magnify" size="1.5rem"/>
        </button>
      </label>
    </div>
    <form class="modal-backdrop" method="dialog">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
const query = ref('')
const dialog = ref<HTMLDialogElement | null>(null)
const search = () => {
  dialog.value?.close()
  navigateTo(`/search?query=${query.value}`)
}
const showModal = () => {
  query.value = ''
  dialog.value?.showModal()
}
</script>

<style scoped>
.modal-box {
  top: 4rem;
}
</style>
