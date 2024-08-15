<template>
  <main class="justify-center items-center">
    <div
        class="form-control p-4 flex flex-col bg-base-100 rounded-2xl w-full max-w-sm">
      <template v-if="!code">
        <div>
          <label class="label" for="email-input">Email</label>
          <input id="email-input" v-model="email" autocomplete="on"
                 class="input input-bordered w-full" name="email" type="email"/>
        </div>
        <button class="btn btn-success mt-4" @click="requestPasswordReset">
          <span :class="{'loading loading-spinner': loading}">
            Reset password
          </span>
        </button>
        <button class="btn btn-link" @click="resend">
          Resend email
        </button>
      </template>
      <template v-else>
        <div>
          <label class="label" for="password-input">Password</label>
          <input id="password-input" v-model="password" autocomplete="on"
                 class="input input-bordered w-full" name="password" type="password"/>
        </div>
        <button class="btn btn-success mt-4" @click="resetPassword">
        <span :class="{'loading loading-spinner': loading}">
          Reset password
        </span>
        </button>
      </template>
    </div>
  </main>
</template>
<script lang="ts" setup>
definePageMeta({
  title: 'Reset Password',
  description: 'Reset Password Page.'
})
useHead({
  title: 'Reset Password',
})

const supabase = useSupabaseClient()
const toast = useToast()

const route = useRoute()
const code = ref(route.query.code || '')
const email = ref(route.query.email || '')
const password = ref('')
const loading = ref(false)

const requestPasswordReset = async () => {
  loading.value = true
  const {error} = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: location.protocol + '//' + location.host + '/reset-password',
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
  loading.value = true
  const {error} = await supabase.auth.updateUser({
    password: password.value,
  })
  if (error) {
    console.error(error)
    toast.Error(error.message)
  } else {
    toast.Success('Success')
    navigateTo('/')
  }
  loading.value = false
}

const resend = async () => {
  loading.value = true
  const {error} = await supabase.auth.resend({
    type: 'signup',
    email: email.value,
    options: {
      emailRedirectTo: location.protocol + '//' + location.host + '/reset-password',
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
</script>
