<template>
  <main>
    <tag-badge :tag="new Tag({name: route.params.name})"
               class="self-center text-2xl mt-4 mb-8"></tag-badge>
    <blog-list ref="list" :load-function="loadFunction"></blog-list>
  </main>
</template>
<script lang="ts" setup>
import BlogList from "~/components/list/BlogList.vue";
import {Blog, Tag} from "~/models";

const route = useRoute()
const supabase = useSupabaseClient()
const toast = useToast()
const loadFunction = async (ascending = false) => {
  let query = supabase.from('blogs_tag')
      .select('*')
      .contains('tags', [route.params.name])
      .order('id', {ascending: false})
  const {data, error} = await query
  if (error) {
    console.error(error)
    toast.Error(error.message)
    return
  }
  return Blog.fromArray<Blog>(data)
}
</script>