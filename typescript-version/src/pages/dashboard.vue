<script setup lang="ts">
import AnalyticsCostHostelVue from '@/views/dashboard/AnalyticsCostHostel.vue'
import AnalyticsHostelVue from '@/views/dashboard/AnalyticsHostel.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'
import AnalyticsUserTable from '@/views/dashboard/AnalyticsUserTable.vue'
import AnalyticsWeeklyOverview from '@/views/dashboard/AnalyticsWeeklyOverview.vue'
import AnalyticsNewHostelVue from '@/views/dashboard/AnalyticsNewHostel.vue'
const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'mdi-poll',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project',
}

const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'mdi-briefcase-variant-outline',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project',
}
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="12"
    >
      <AnalyticsCostHostelVue />
    </VCol>
    
    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsTransactions />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
    <AnalyticsNewHostelVue/>
      <!-- <AnalyticsWeeklyOverview :data="[50, 30, 340, 34]" /> -->
    </VCol>
    <VCol cols="12">
      <AnalyticsHostelVue />
    </VCol>
    <VCol cols="12">
      <AnalyticsUserTable />
    </VCol>
  </VRow>
</template>
