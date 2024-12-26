<template>
  <main class="gap-8">
    <transition-group
        class="blog-list relative space-y-6"
        name="list" tag="div"
    >
      <div
          v-for="blog in blogs"
          :key="blog.id.toString()"
          class="w-full grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-2"
      >
        <h3>
          <nuxt-link :to="`/admin/blog/edit?id=${blog.id}`" class="hover:underline">
            {{ blog.title }}
          </nuxt-link>
        </h3>
        <span class="font-semibold place-self-center ">{{ $t('publish') }}</span>
        <span></span>
        <p class="line-clamp-3">{{ blog.excerpt || blog.text }}</p>
        <input v-model="blog.published" class="toggle toggle-primary" type="checkbox"
               @click="togglePublish(blog)"/>
        <button class="btn btn-ghost" @click="deleteBlog(blog)">
          <icon class="text-red-700" name="mdi:trash" size="1.25em"></icon>
        </button>

      </div>
    </transition-group>
    <div class="join flex justify-center">
      <button class="join-item btn" @click="page=Math.max(page-1,0)">«</button>
      <button v-for="i in [...new Array(maxPages).keys()]"
              :key="i" :class="{'btn-active': page===i}"
              class="join-item btn"
              @click="page=i">
        {{ i + 1 }}
      </button>
      <button class="join-item btn" @click="page=Math.min(page+1, maxPages-1)">»</button>
    </div>
    <button class="btn btn-fixed btn-lg btn-circle btn-primary"
            @click="navigateTo('/admin/blog/edit')">
      <Icon name="ic:baseline-edit" size="1.5rem"/>
    </button>
  </main>
</template>

<script lang="ts" setup>
import {Blog, type OrderField} from "@/models";
import {select} from "@/composables/myFetch";

definePageMeta({
  keepalive: true
})
useSeoMeta({
  title: useNuxtApp().$i18n.t('blog'),
  description: useNuxtApp().$i18n.t('blog-description'),
})

const PAGE_SIZE = 20
const maxPages = ref(1)

const blogs = reactive([] as Blog[])
const order = ref<OrderField>('id')
const supabase = useSupabaseClient()
const toast = useToast()
const load = async (page = 0) => {
  const {data, error, count} = await supabase.from('blog')
      .select(select.blog, {count: 'planned'})
      .order(order.value, {ascending: false})
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
  if (error) {
    console.error(error)
    toast.Error(error.message)
    return
  }
  maxPages.value = Math.ceil(count! / PAGE_SIZE)
  blogs.length = 0
  blogs.push(...Blog.fromArray<Blog>(data))
}

const deleteBlog = async (blog: Blog) => {
  const result = confirm(`Are you sure you want to delete this post?`)
  if (!result) return
  const {error} = await supabase.from('blog').delete().eq('id', blog.id)
  if (error) {
    console.error(error)
    toast.Error(error.message)
    return
  }
  // delete from blogs
  blogs.splice(blogs.indexOf(blog), 1)
  toast.Success(`Blog deleted`)
}

const togglePublish = async (blog: Blog) => {
  blog.published = !blog.published
  const {error} = await supabase.from('blog')
      .update({'published': blog.published} as never)
      .eq('id', blog.id)
  if (error) {
    console.error(error)
    toast.Error(error.message)
    return
  }
  if (blog.published) toast.Success(`Blog published`)
  else toast.Warning(`Blog unpublished`)
}

const page = ref(0)
watch(page, () => {
  load(page.value)
})

onMounted(() => {
  load(0)
})
</script>