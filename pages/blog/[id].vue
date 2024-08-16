<template>
  <main class="gap-4">
    <h-img :src="`/api/image?hash=${blog.id}`" alt="background image"
           class="rounded-2xl" style="height: 33dvh"/>
    <h1 v-if="blog.title" class="h1 text-center">{{ blog.title }}</h1>
    <div class="relative -top-4 flex justify-between items-center text-sm">
      <span class="w-20"></span>
      <div class="inline-flex gap-2">
        <TagBadge v-for="tag in blog.tags" :key="tag.id.toString()" :tag="tag"/>
      </div>
      <span class="w-20"><client-only>
        {{ blog.id.getTime().toLocaleDateString() }}
      </client-only></span>
    </div>
    <article class="text" v-html="$mdRenderer.render(blog.text)"></article>
    <div class="flex flex-col">
      <div class="flex justify-end items-center">
        <Icon name="mdi:eye-outline"/>&nbsp;{{ blog.view }}
        &nbsp;&nbsp;
        <Icon name="mdi:heart-outline"/>&nbsp;{{ blog.likes }}
      </div>
      <button class="btn btn-circle btn-lg text-red-800 text-2xl font-bold self-center"
              @click="onLikeClick"
              @mousedown.prevent>
        <Icon v-if="loading" name="line-md:loading-twotone-loop"></Icon>
        <Icon v-else-if="blog.liked" name="mdi:heart"></Icon>
        <Icon v-else name="mdi:heart-outline"></Icon>
      </button>
    </div>
    <div id="comments" class="flex flex-col gap-2">
      <h2>{{ $t('comment') }}</h2>
      <comment-list :parent_id="blog.id.toString()"/>
      <edit-comment :comment="new Comment({
        parent_id: blog.id,
      })" class="mt-4"
                    @created="onCommentCreated"/>
    </div>
  </main>
</template>

<script lang="ts" setup>
import {select} from "@/composables/myFetch";
import {Blog, Comment, UUID} from "@/models";
import TagBadge from "@/components/tag/TagBadge.vue";
import CommentList from "@/components/list/CommentList.vue";
import EditComment from "~/components/comment/EditComment.vue";

definePageMeta({
  keepalive: true,
})

const {$mdRenderer} = useNuxtApp()
const route = useRoute()
const supabase = useSupabaseClient()

const blogFromCache = async () => {
  if (!process.browser) return
  const cache = await caches.open('api')
  const resp = await cache.matchAll('/rest/v1/blogs', {ignoreSearch: true})
  const result = await Promise.all(
      resp.filter(r => r.url.includes('parent_id=eq.'))
          .map(r => r.json())
  )
  const blogs = <Blog[]>[].concat(...result)

  const index = blogs.findIndex(t => t.id.toString() === route.params.id)
  if (index >= 0) {
    console.log(`Blog #${route.params.id} found in cache!`)
    return blogs[index]
  }
}

const value = <string>route.params.id
let type = 'id'
try {
  UUID.parse(value)
} catch {
  type = 'title'
}
const {data} = await useAsyncData(async () => {
  const d = await blogFromCache()
  if (d) return d
  const {data} = await supabase.from('blogs')
      .select(select.blog)
      .eq(type, value)
      .single<Blog>()
  return data
})
const blog = reactive(new Blog(data.value!))

const loading = ref(false)
const onLikeClick = () => {
  blog.changeLike(loading)
}

useSeoMeta({
  title: () => blog.title || useNuxtApp().$i18n.t('blog'),
})

const onCommentCreated = (c: Comment) => {
  blog.comment++
}

</script>>