<template>
  <v-toolbar color="transparent">
    <v-toolbar-title> Manage </v-toolbar-title>
    <template v-slot:extension>
      <v-tabs
        v-model="tab"
        color="primary"
        grow
      >
        <v-tab :value="1">
          <v-icon>codicon:extensions</v-icon>
          Hostels
        </v-tab>
        <v-tab :value="2">
          <v-icon>mdi-account-outline</v-icon>
          Users
        </v-tab>
      </v-tabs>
    </template>
  </v-toolbar>

  <v-window v-model="tab">
    <v-window-item
      v-for="n in 2"
      :key="n"
      :value="n"
    >
      <component
        v-if="n === 2"
        :is="ManagerUser"
      />
      <component
        v-if="n === 1"
        :is="ManagerRental"
      />
    </v-window-item>
  </v-window>
</template>
<script setup lang="ts">
import ManagerRental from '@/pages/manager-rental.vue'
import ManagerUser from '@/pages/manager-user.vue'
const tab = ref(0)
</script>
