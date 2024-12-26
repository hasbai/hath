<template>
  <div class="card sm:card-side w-full items-center bg-base-100 shadow-xl"
       @click="navigateTo(`/blog/${blog.id}`)">
    <figure>
      <h-img :src="`/api/image?hash=${blog.id}`" alt="background image"/>
    </figure>
    <div class="card-body gap-0 justify-evenly">
      <h2 v-if="blog.title" class="card-title my-0 cursor-default">{{ blog.title }}</h2>
      <article class="text cursor-default" v-html="$mdRenderer.render(blog.excerpt || blog.text)">
      </article>
      <div class="flex justify-between items-center text-sm">
        <span><client-only>
          {{ blog.id.getTime().toLocaleDateString() }}
        </client-only></span>
        <div class="inline-flex gap-2">
          <TagBadge v-for="tag in blog.tags" :key="tag.id.toString()" :tag="tag"/>
        </div>
        <div class="inline-flex justify-end gap-2">
          <span class="inline-flex items-center">
            <Icon name="mdi:eye-outline"/>&nbsp;{{ blog.views }}
          </span>
          <span class="inline-flex items-center">
          <Icon name="mdi:comment-outline"/>&nbsp;{{ blog.reply }}
          </span>
          <span class="inline-flex items-center">
            <Icon name="mdi:heart-outline"/>&nbsp;{{ blog.likes }}
          </span>
        </div>
      </div>
    </div>
    <nuxt-link :to="`/blog/${blog.id}`"></nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import {type Blog} from '@/models'
import TagBadge from "@/components/tag/TagBadge.vue";
import HImg from "~/components/HImg.vue";

const {blog} = defineProps<{ blog: Blog }>()
const {$mdRenderer} = useNuxtApp()
</script>

<style scoped>
.card:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

@media (max-width: 640px) {
  .card > figure {
    height: 25vh;
    width: 100%;
  }

  .card-body {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    gap: 0.5rem;
  }
}

@media (min-width: 640px) {
  .card {
    height: 30vh;
    min-height: 10rem;
    max-height: 14rem;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .card > figure {
    flex: 0 0 33%;
  }
}

article > * {
  margin: 0;
}
</style>