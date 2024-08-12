<template>
    <main class="items-center justify-center h-screen">
      <p class="cursor-pointer" @click="input('text')">
        距离 {{text}} 还有
      </p>
      <p class="text-2xl cursor-pointer" @click="input('date')">
        <span class="text-3xl clock-font">{{days.weeks}}</span>
        &nbsp;weeks&nbsp;
        <span class="text-3xl clock-font">{{days.days}}</span>
        &nbsp;days&nbsp;
      </p>
      <p class="clock-font text-4xl">
        {{days.time}}
      </p>
      <p>&nbsp;</p><p>&nbsp;</p>
    </main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'
dayjs.extend(weekOfYear)
dayjs.extend(objectSupport)
dayjs.extend(utc)

const date = ref(dayjs(localStorage.getItem('countdown_date')))
const now = ref(dayjs())
const days = computed(() => {
  return {
    weeks: date.value.diff(now.value, 'week'),
    days: Math.max(5 - now.value.day(), 0),
    time: dayjs({hour: 17, minute: 0, second: 0})
        .subtract(now.value)
        .utc().format('HH : mm : ss'),
  }
})

onMounted(() => setInterval(() => {
  now.value = dayjs()
}, 1000))

const text = ref(localStorage.getItem('countdown_text') || '')
const input = (name: string) => {
  const value = prompt(
      `Enter ${name}`,
      localStorage.getItem(`countdown_${name}`) || ''
  )
  if (value) {
    localStorage.setItem(`countdown_${name}`, value)
    switch (name) {
      case 'date':
        date.value = dayjs(value)
        break
      case 'text':
        text.value = value
        break
    }
  }
}
for (const name of ['date', 'text']) {
  if (!localStorage.getItem(`countdown_${name}`)) input(name)
}
</script>
<style scoped>
main p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>