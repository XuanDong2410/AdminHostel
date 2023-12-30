<script setup lang="ts">
import { HostelReadonly } from '@/types/Hostel'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps<{

  loveandcomment: HostelReadonly['loveandcomment']

  loading: boolean
}>()

const data = computed(() => ({
  //series: numbers.value,
  chartOptions: {
    chart: {
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Love and Comment',
      align: 'left',
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        `${props.loveandcomment.year}-12`,
        `${props.loveandcomment.year}-11`,
        `${props.loveandcomment.year}-10`,
        `${props.loveandcomment.year}-09`,
        `${props.loveandcomment.year}-08`,
        `${props.loveandcomment.year}-07`,
        `${props.loveandcomment.year}-06`,
        `${props.loveandcomment.year}-05`,
        `${props.loveandcomment.year}-04`,
        `${props.loveandcomment.year}-03`,
        `${props.loveandcomment.year}-02`,
        `${props.loveandcomment.year}-01`,
      ],
    },

    tooltip: {
      x: {
        format: 'MM/yyyy',
      },
    },
  },
}))
</script>

<template>
    <VCardText class="mx-0 my-0 pb-0">
      <VueApexCharts
        :options="data.chartOptions"
        :series="loveandcomment.value"
        :height="380"
      />
    </VCardText>   

    <v-overlay
      :model-value="loading"
      contained
      class="align-center justify-center"
    >
      <v-progress-circular :value="20"></v-progress-circular>
    </v-overlay>
</template>
