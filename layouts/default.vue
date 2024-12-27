<template>
  <div>
    <div class="navbar border-b-1">
      <div class="navbar-start">
        <label class="sm:hidden btn bg-transparent border-0" for="side-bar">
          <Icon name="mdi:menu" size="1.5rem"/>
        </label>
        <nuxt-link :to="localePath(`${inAdmin}/`)"
                   class="text-xl btn btn-ghost mx-4 lg:mx-8 xl:mx-16 2xl:mx-24">
          {{ !inAdmin ? $t('title') : $t('admin') }}
        </nuxt-link>
        <div class="space-x-4 links sm:flex hidden">
          <nuxt-link :to="localePath(`${inAdmin}/blog`)" class="btn btn-link">
            {{ $t('blog') }}
          </nuxt-link>
          <nuxt-link v-if="!inAdmin" :to="localePath('/admin')" class="btn btn-link">
            {{ $t('admin') }}
          </nuxt-link>
          <nuxt-link v-else :to="localePath('/')" class="btn btn-link">
            {{ $t('back-to-home') }}
          </nuxt-link>
        </div>
      </div>
      <div class="navbar-center">
      </div>
      <div class="navbar-end">
        <SearchBar/>
        <SwitchLocale/>
        <SwitchTheme class="mx-2"/>
      </div>
    </div>
    <div class="drawer">
      <input id="side-bar" class="drawer-toggle" type="checkbox"/>
      <div class="w-64 hidden 2xl:block" style="grid-column-start: 3"></div>
      <div class="drawer-content">
        <slot></slot>
        <page-foot/>
      </div>
      <div class="drawer-side">
        <label class="drawer-overlay bg-transparent" for="side-bar"></label>
        <ul
            class="menu w-64 p-4 mr-4 mb-4 h-fit flex flex-col space-y-2
          leading-loose bg-base-100 rounded-r-3xl shadow-lg border-t-2 border-base-300">
          <li>
            <nuxt-link :to="localePath(`${inAdmin}/`)" @click="toggleDrawer">
              {{ $t('home') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath(`${inAdmin}/blog`)" @click="toggleDrawer">
              {{ $t('blog') }}
            </nuxt-link>
          </li>
          <li v-if="!inAdmin">
            <nuxt-link :to="localePath('/admin')" @click="toggleDrawer">
              {{ $t('admin') }}
            </nuxt-link>
          </li>
          <li v-else>
            <nuxt-link :to="localePath('/')" @click="toggleDrawer">
              {{ $t('back-to-home') }}
            </nuxt-link>
          </li>
          <hr class="border-base-200">
          <li class="text-xs text-gray-500">
            {{ $t('copyright') }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SwitchTheme from "~/components/header/SwitchTheme.vue";
import SearchBar from "~/components/header/SearchBar.vue";
import SwitchLocale from "~/components/header/SwitchLocale.vue";
import PageFoot from "~/components/PageFoot.vue";

const localePath = useLocalePath()
const toggleDrawer = () => {
  const sideBar = document.getElementById('side-bar') as HTMLInputElement
  sideBar.checked = !sideBar.checked
}
const inAdmin = computed(() => useRoute().path.includes('/admin') ? '/admin' : '')
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid;
  border-color: var(--fallback-b2, oklch(var(--b2)));
}

.links {
  position: relative;
  top: 1px;
}

.links > a {
  @apply no-underline hover:underline text-current text-base;
}

.drawer-overlay {
  background: transparent !important;
}

.drawer-side {
  position: absolute;
  height: 100%;
}
</style>