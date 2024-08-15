<template>
  <div class="collapse mt-2">
    <input name="toggle_poll_editor" type="checkbox"/>
    <div class="collapse-title text-xl font-medium">
      &nbsp;Poll
    </div>
    <div class="collapse-content mt-2">
      <TransitionGroup class="space-y-2 relative" name="list-x" tag="ul">
        <li v-for="(option, i) in blog.pollOptions" :key="option.id"
            class="flex items-center space-x-1 w-full">
          <input v-model="option.text"
                 class="input input-bordered input-sm flex-1" placeholder="Poll option"
                 type="text"/>
          <button class="btn btn-square btn-ghost btn-sm"
                  @click="blog.pollOptions.splice(i, 1)">
            ✕
          </button>
        </li>
        <button key="add" class="btn btn-square btn-ghost btn-sm"
                @click="blog.pollOptions.push(new PollOption({
                  parent_id: blog.id
                }))">
          +
        </button>
      </TransitionGroup>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {type Blog, PollOption} from "@/models";

const {blog} = defineProps<{ blog: Blog }>()
</script>