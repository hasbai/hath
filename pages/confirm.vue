<template>
  <main>{{ txt }}</main>
</template>

<script lang="ts" setup>
useHead({
  title: 'Confirm account',
})

const txt = ref('Waiting for login...')
const route = useRoute()
if (route.query.error) {
  txt.value = route.query['error_description']?.toString() || 'Unknown error'
}

const user = useSupabaseUser()
if (user.value) {
  navigateTo('/me')
}

watch(user, () => {
  if (user.value) {
    navigateTo('/me')
  }
}, {immediate: true})
</script>
