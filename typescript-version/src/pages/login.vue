<template>
  <div class="auth-wrapper pa-4">
    <VCard
      class="auth-card pa-4 mx-auto pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Online Hostels </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Welcome! 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account</p>
      </VCardText>

      <VCardText>
        <VForm
          @submit.prevent="login"
          fast-fail
          ref="vFormLogRef"
        >
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                :rules="[data.rules.required, data.rules.email]"
                prepend-inner-icon="mdi-email-outline"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                :rules="[data.rules.required]"
                prepend-inner-icon="mdi-shield-account"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="http://localhost:5174/dashboard"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>
<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useAuth, useUser } from 'vue-auth3'
import { useTheme } from 'vuetify'
import type { VForm } from 'vuetify/components/VForm'
const user = useUser()

const auth = useAuth()

const form = ref({
  email: '',
  password: '',
  remember: false,
})
const toastStore = useToastStore()
const data = {
  rules: {
    required: (value: any) => !!value || 'Required.',
    email: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  },
}
const vFormLogRef = ref<VForm>()

const logging = ref(false)
async function login() {
  if (!(await vFormLogRef.value?.validate())?.valid) return

  logging.value = true

  try {
    const { data } = await auth.login({
      data: new URLSearchParams({
        email: form.value.email,
        password: form.value.password,
      }),
      redirect: 'pages/dashboard',
    })

    toastStore.create({
      message: `Đã đăng nhập với tư cách ${data.name}`,
      color: 'success',
    })
  } catch (err) {
    console.warn(err)
    toastStore.create({
      message: 'Khong thanh cong',
      color: 'error',
    })
  } finally {
    logging.value = true
  }
}

const isPasswordVisible = ref(false)

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
</script>

<style lang="scss">
@import '@core/scss/pages/page-auth';
</style>
