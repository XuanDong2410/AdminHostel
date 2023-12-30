<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
</script>

<template>
  <VApp>
    <RouterView />

    <v-snackbar
      v-for="(toast, index) in toastStore.toasts"
      :key="index"
      :model-value="true"
      :color="toast.color"
      location="top right"
      @update:model-value="$event ? void 0 : toastStore.remove(toast)"
      >{{ toast.message }}</v-snackbar
    >
  </VApp>
</template>
