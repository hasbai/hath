<template>
  <div class="tag-input">
    <div class="flex flex-wrap items-center gap-2 mb-2">
      <TagBadge v-for="tag in selectedTags" :key="tag.id"
                :tag="tag" class="mx-0.5 my-0.5 cursor-pointer" cnt
                @click.stop="select(tag, true)"/>
      <button class="btn btn-xs" @click.stop="showInputCallback">
        +
      </button>
    </div>
    <Transition name="fade">
      <div v-show="showInput" class="relative">
        <div class="absolute w-full bg-base-100 pb-4">
          <input id="tag-name-input" v-model="query" autocomplete="off"
                 class="input input-bordered w-full bg-base-100 shadow-lg" name="name"
                 type="text" @click.stop @keyup.enter.stop="addTag"
          >
          <Icon class="absolute right-3 top-3" name="material-symbols:search" size="1.5em"/>
          <ClientOnly>
            <TransitionGroup
                class="menu flex-row w-full mt-4 rounded-lg shadow-lg
                       bg-base-100 border border-base-content/20
                       overflow-y-auto no-scrollbar text-base sm:text-sm"
                name="list"
                tag="ul"
            >
              <li v-if="filteredTags.length === 0 && query !== ''" @click.stop="addTag">
                <p class="block">
                  Click or press <kbd class="kbd kbd-sm">Enter</kbd> to create a new tag.
                </p>
              </li>
              <li
                  v-for="tag in filteredTags"
                  :key="tag.id"
              >
                <TagBadge :tag="tag" class="flex gap-0 px-2 py-1 rounded-xl"
                          @click.stop="select(tag)"/>
              </li>
            </TransitionGroup>
          </ClientOnly>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import {type Tag} from "@/models";
import TagBadge from "@/components/tag/TagBadge.vue";
import {useSupabaseClient, useToast} from "@/.nuxt/imports";

const tags = await $myFetch<Tag[]>('/tag', {
  query: {
    order: 'popularity.desc'
  }
})

const emit = defineEmits(["update:modelValue"])
const {modelValue} = defineProps<{ modelValue: Tag[] }>();
const selectedTags = reactive(new Set(modelValue))
const selected = (tag: Tag) => selectedTags.has(tag)
const select = (tag: Tag, del = false) => {
  if (del || selected(tag)) {
    selectedTags.delete(tag)
  } else {
    selectedTags.add(tag)
  }
  emit('update:modelValue', Array.from(selectedTags))
}

const query = ref('')
const filteredTags = computed(() => query.value
    ? tags.filter((tag) => !selectedTags.has(tag) && tag.name.includes(query.value))
    : tags.filter((tag) => !selectedTags.has(tag))
)

const showInput = ref(false)
const showInputCallback = () => {
  showInput.value = !showInput.value
  if (showInput.value) {
    nextTick(
        () => document.querySelector<HTMLInputElement>('.tag-input input')?.focus()
    )
  }
}
onMounted(() => {
  document.addEventListener('click', () => {
    if (showInput.value) {
      showInput.value = false
    }
  })
})
const supabase = useSupabaseClient()
const bus = useToast()
const addTag = async () => {
  const _tag = tags.find((tag) => tag.name === query.value)
  if (_tag) {
    select(_tag)
    query.value = ''
    return
  }
  let {data: tag, error, status} = await supabase.from('tag').insert(
      {name: query.value} as never
  ).select().single<Tag>()
  if (status === 409) {
    const {data: _tag, error} = await supabase.from('tag').select().eq(
        'name', query.value
    ).single<Tag>()
    if (error) {
      bus.Error(error.message)
      return
    }
    tag = _tag
  } else if (error) {
    bus.Error(error.message)
    return
  }
  tags.push(tag!)
  select(tag!)
  query.value = ''
}
</script>
