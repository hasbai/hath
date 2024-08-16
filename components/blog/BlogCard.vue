<template>
  <div class="card sm:card-side w-full items-center bg-base-100 shadow-xl"
       @click="navigateTo(`/blog/${blog.id}`)">
    <figure>
      <h-img :src="`/api/image?hash=${blog.id}`" alt="background image"/>
    </figure>
    <div class="card-body justify-evenly">
      <div class="cursor-default">
        <h2 v-if="blog.title" class="card-title my-0">{{ blog.title }}</h2>
        <article class="text" v-html="$mdRenderer.render(blog.excerpt || blog.text)">
        </article>
      </div>
      <div class="flex justify-between items-center text-sm">
        <span><client-only>
          {{ blog.id.getTime().toLocaleDateString() }}
        </client-only></span>
        <div class="inline-flex gap-2">
          <TagBadge v-for="tag in blog.tags" :key="tag.id.toString()" :tag="tag"/>
        </div>
        <span class="inline-flex items-center">
            <Icon name="mdi:eye-outline"/>&nbsp;{{ blog.view }}
            &nbsp;
            <Icon name="mdi:heart-outline"/>&nbsp;{{ blog.likes }}
          </span>
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
    height: 25dvh;
    width: 100%;
  }

  .card-body {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
}

@media (min-width: 640px) {
  .card {
    height: 30dvh;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0;
  }

  .card > figure {
    flex: 0 0 33%;
  }
}

figure > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>