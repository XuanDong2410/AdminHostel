<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="12"
    >
      <VCard>
        <VCardText>
          <VueApexCharts
            :options="data.chartOptions"
            :series="data.series"
            :height="600"
          />
        </VCardText>
      </VCard>
    </VCol>
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsWeeklyOverview :data="response.data2" />
    </VCol> -->
    <VCol
      cols="12"
      md="12"
    >
      <VCard>
        <VCardText>
          <h6 class="text-h6">2,856</h6>
          <VueApexCharts
            :options="options"
            :label="Donut_label"
            :series="Donut_series"
            :height="300"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <!-- <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>Loading...</div> -->
</template>
<script setup lang="ts">
import { API_URL } from '@/constants'
import { useRequest } from 'vue-request'
import VueApexCharts from 'vue3-apexcharts'

const Donut_series = [10, 20, 30, 40]
const Donut_label = ['Admin', 'Moderator', 'Owner', 'User']
var options = {
  chart: {
    width: 300,
    type: 'donut',
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 230,
  },

  dataLabel: ['Admin', 'Moderator', 'Owner', 'User'],
}
const series = [
  {
    name: 'Posted',
    data: [31, 40, 128, 51, 42, 109, 100],
  },
  {
    name: 'Rented',
    data: [31, 20, 12, 11, 22, 19, 12],
  },
]
// const {
//   data: response,
//   loading,
//   error,
// } = useRequest<{
//   data1: number[]
//   data2: number[]
// }>(() => fetch(`${API_URL}/analytics/`).then(res => res.json()))

//computed(() => {
//   return {
const data = {
  series: series,
  chartOptions: {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '(numbers) Hotels',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: unknown) {
          return val + ' Hostels'
        },
      },
    },
  },
}
</script>
