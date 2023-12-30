<script setup lang="ts">
import { API_URL } from '@/constants'
import { NumberCost } from '@/types/Numbers'
import { useRequest } from 'vue-request'
import VueApexCharts from 'vue3-apexcharts'
const {
  data: numbercosts,
  loading,
  error,
} = useRequest<NumberCost[]>(() => fetch(`${API_URL}/numbercosts`).then(res => res.json()))
watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})
const data = computed(() => {
  return {
    //series: numbers.value,
    series: numbercosts.value,
    chartOptions: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      title: {
        text: 'Tỉ lệ tương tác giữa các giá tiền',
        align : 'left',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: 'text',
        categories: [
          'Dưới 1.000.000vnđ',
          '5.000.000vnđ',
          '10.000.000vnđ',
          '15.000.000vnđ',
          '20.000.000vnđ',
          'Trên 35.000.000vnđ',
        ],
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  }
})
</script>

<template>
  <VCard
    v-if="!error && !loading"
    class="match-height"
  >
    <VCardText>
      <VueApexCharts
        :options="data.chartOptions"
        :series="data.series"
        :height="400"
      />
    </VCardText>
  </VCard>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>Loading...</div>
</template>
