<template>
  <VCard
    v-if="!error && !loading"
    class="match-height"
  >
  <VCardTitle>
    Số lượng người dùng mới
  </VCardTitle>
    <VCardText>
      <!-- <VRow class="d-flex align-center">
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          sm="3"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="42"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow> -->

      <VueApexCharts
        class="mt-8"
        :options="data.chartOptions"
        :series="data.series"
        :height="400"
      />
    </VCardText>
  </VCard>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>Loading...</div>
</template>
<script setup lang="ts">
import { API_URL } from '@/constants'
import { UserNumber } from '@/types/Numbers'
import { useRequest } from 'vue-request'
import VueApexCharts from 'vue3-apexcharts'
const {
  data: usernumbers,
  loading,
  error,
} = useRequest<UserNumber[]>(() => fetch(`${API_URL}/usernumbers`).then(res => res.json()))
watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})
const statistics = [
  {
    title: 'Users',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Hostels',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Money',
    stats: '$88k',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]
const data = computed(() => {
  return {
    series: usernumbers.value,
    // [
    //   {
    //     name: 'User',
    //     data: [44, 55, 41, 67, 22],
    //   },
    //   {
    //     name: 'Owner',
    //     data: [48, 50, 40, 65, 25],
    //   },
    // ],
    chartOptions: {
      chart: {
        type: 'bar',
        height: 500,
        with: 500,
        stacked: true,
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      dataLabels: {
        // formatter: (val) => {
        //   return val / 1 + 'K'
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Online advertising', 'Sales Training', 'Print advertising', 'Catalogs', 'Meetings'],
      labels: {
        // formatter: (val) => {
        //   return val / 1 + 'K'
      },
    },

    fill: {
      opacity: 1,
    },
    colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  }
})
</script>
