<script setup lang="ts">
import { HostelReadonly } from '@/types/Hostel'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps<{
  rateproperties: {
    name: string
    data: number[]
  }[]
}>()

const dataRates = {
  chartOptions: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '100px',
              fontWeight: 500,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
    },
    title: {
      text: 'Rates',
    },
    xaxis: {
      categories: ['Số lượng'],
      labels: {
        formatter: function (val: unknown) {
          return val
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: unknown) {
          return val
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
    colors: ['#9ADE7B', '#CBFFA9', '#F7D060', '#FFB534', '#FF6464'],
  },
}
</script>

<template>
    <VCardText class="mx-0">
      <VueApexCharts
        :options="dataRates.chartOptions"
        :series="rateproperties"
        :height="150"
      />
    </VCardText>

</template>
