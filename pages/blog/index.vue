<template>
  <main>
    <blog-list ref="list" :load-function="loadFunction"></blog-list>
    <button class="btn btn-fixed btn-lg btn-circle btn-primary"
            @click="navigateTo('/admin/blog/edit')">
      <Icon name="ic:baseline-edit" size="1.5rem"/>
    </button>
  </main>
</template>

<script lang="ts" setup>
import {Blog, type OrderField} from "@/models";
import {select} from "@/composables/myFetch";
import {toJSON} from "@/utils";
import BlogList from "@/components/list/BlogList.vue";

definePageMeta({
  keepalive: true
})
useSeoMeta({
  title: useNuxtApp().$i18n.t('blog'),
  description: useNuxtApp().$i18n.t('blog-description'),
})

const list = ref<typeof BlogList | null>(null)
const unshift = () => {
  list.value?.load(true)
}

const order = ref<OrderField>('id')

const PAGE_SIZE = 20

const supabase = useSupabaseClient()
const toast = useToast()
const loadFunction = async (blogs: Blog[], ascending = false) => {
  let query = supabase.from('blog').select(select.blog)
      .order(order.value, {ascending: false})
      .range(0, PAGE_SIZE - 1)
  if (blogs.length > 0) {
    if (ascending) query = query.gt(order.value, toJSON(blogs[0][order.value]))
    else query = query.lt(order.value, toJSON(blogs[blogs.length - 1][order.value]))
  }
  const {data, error} = await query
  if (error) {
    console.error(error)
    toast.Error(error.message)
    return
  }
  return Blog.fromArray<Blog>(data)
}
const edit = () => {
  needAuth()
  const dialog = document.getElementById('edit_blog') as HTMLDialogElement
  dialog.showModal()
}
</script>