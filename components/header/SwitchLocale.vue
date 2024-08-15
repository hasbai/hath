<template>
  <div class="dropdown">
    <div class="btn btn-ghost" role="button" tabindex="0">
      <Icon name="material-symbols:translate" size="1.5rem"></Icon>
    </div>
    <ul class="dropdown-content rounded-box z-[1] p-2 space-y-1 shadow-2xl bg-base-100"
        tabindex="0">
      <li v-for="(locale, i) in locales">
        <input
            :key="i"
            :aria-label="labels[i]"
            :value="locale"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            name="theme-dropdown" type="radio"
            @click="onClick"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const {setLocale} = useI18n()
const locales = ['zh-CN', 'en']
const labels = ['中文', 'English']

const onClick = (e: PointerEvent) => {
  const target = e.target as HTMLInputElement
  setLocale(target.value)
  target.blur()
}
</script>