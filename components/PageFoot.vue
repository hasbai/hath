<template>
  <footer class="h-12 text-center caption mt-36">
    <nuxt-link href="https://icp.gov.moe/?keyword=20241064" target="_blank">
      {{ $t('icp') }}
    </nuxt-link>
    <div>{{ $t('copyright') }}</div>
  </footer>
</template>
<script>
export default {
  name: 'page-foot'
}
</script>