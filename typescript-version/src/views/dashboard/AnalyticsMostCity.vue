<script setup lang="ts">
import { API_URL } from '@/constants'
import { NumberMostCity } from '@/types/Numbers'
import { useRequest } from 'vue-request'
import VueApexCharts from 'vue3-apexcharts'
const {
  data: numbermostcitys,
  loading,
  error,
} = useRequest<NumberMostCity[]>(() => fetch(`${API_URL}/numbermostcitys`).then(res => res.json()))
watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})
const data = computed(() => {
  return {
    //series: numbers.value,
    series: numbermostcitys.value,
    // series: [{
    //         name: 'Inflation',
    //         data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    //       }],
    chartOptions: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: unknown) {
          return val
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: ['TP HCM','Hue','DaNang','','HaNoi'],
        //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: unknown) {
            return val + '%'
          },
        },
      },
      title: {
        text: 'Các thành phố có nhiều phòng trọ nhất',
        align: 'left',
        style: {
          color: '#444',
        },
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
        :height="500"
      />
    </VCardText>
  </VCard>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>Loading...</div>
</template>
