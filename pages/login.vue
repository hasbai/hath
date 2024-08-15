<template>
  <main class="justify-center items-center max-w-lg">
    <div
        class="form-control p-4 flex flex-col bg-base-100 rounded-2xl w-full max-w-sm">
      <div>
        <label class="label" for="email-input">{{ $t('email') }}</label>
        <input id="email-input" v-model="email" autocomplete="on"
               class="input input-bordered w-full" name="email" type="email"/>
      </div>
      <div>
        <label class="label" for="password-input">{{ $t('password') }}</label>
        <input id="password-input" v-model="password" autocomplete="on"
               class="input input-bordered w-full" name="password" type="password"/>
      </div>
      <button class="btn btn-success mt-4" @click="signupOrLogin">
        <span v-show="loading" class="absolute loading loading-spinner"></span>
        <span :class="{'opacity-0': loading}"> {{ $t('login') }} </span>
      </button>
      <button v-if="state==='signUp'" class="btn btn-link" @click="resend">
        {{ $t('resend') }}
      </button>
      <button v-if="state==='signIn'" class="btn btn-link" @click="resetPassword">
        {{ $t('forgot') }}
      </button>
    </div>
  </main>
</template>
<script lang="ts" setup>
const t = useNuxtApp().$i18n.t
useSeoMeta({
  title: () => t('login'),
})

const supabase = useSupabaseClient()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)
const state = ref('')

const signupOrLogin = async () => {
  loading.value = true
  const status = await $myFetch('/rpc/user_status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      _email: email.value
    }
  })
  switch (status) {
    case null:
      await signUp()
      break
    case 'good':
      await signIn()
      break
    case 'not_confirmed':
      state.value = 'signUp'
      toast.Warning('邮箱未确认！请点击邮件中的链接，或重发验证邮件')
      break
    default:
      toast.Error('Unknown state: ' + state)
      console.error('Unknown state:', state)
  }
  loading.value = false
}

const signIn = async () => {
  state.value = 'signIn'
  const {error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.error(error)
    toast.Error(error.message)
  } else {
    toast.Success('登录成功')
    backOrHome()
  }
}

const signUp = async () => {
  state.value = 'signUp'
  const {error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: location.protocol + '//' + location.host + '/confirm',
    }
  })
  if (error) {
    console.error(error)
    toast.Error(error.message)
  } else {
    toast.Success('验证邮件已发送，请查收\n（它可能出现在垃圾箱中）')
  }
}

const resend = async () => {
  loading.value = true
  const {error} = await supabase.auth.resend({
    type: 'signup',
    email: email.value,
    options: {
      emailRedirectTo: location.protocol + '//' + location.host + '/confirm',
    }
  })
  if (error) {
    console.error(error)
    toast.Error(error.message)
  } else {
    toast.Success('验证邮件已发送，请查收\n（它可能出现在垃圾箱中）')
  }
  loading.value = false
}

const resetPassword = async () => {
  navigateTo('/reset-password?email=' + email.value)
}
</script>
