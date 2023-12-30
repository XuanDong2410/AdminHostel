<template>
  <VCard
    height="auto"
    class="p-0"
  >
    <VCardTitle>Phòng trọ mới đăng </VCardTitle>
    <v-carousel
      cycle
      hide-delimiters
      v-if="!error && !loading"
      :items="newhostels"
      show-arrows="hover"
    >
      <v-carousel-item
        v-for="item in newhostels"
        :key="item.image"
      >
        <VRow class="d-flex justify-center">
          <img
            class="rounded-lg w-60%"
            v-if="item.image"
            :src="item.image"
          />
        </VRow>
        <VRow>
          <VCol class="m-3">
            <VListItemTitle
              class="mx2 pa-2 text-center font-weight-bold"
              v-text="item.title"
            />
            <v-btn class="text-[rgb(246,246,29)] ml-5" color="">{{ item.price }} VNĐ</v-btn>
            <VListItemAction class="m-3">
              <v-btn
                size="small"
                :color="statusColor[status[item.rate]]"
              >
                {{ item.rate }}
              </v-btn>
              <v-btn
                size="small"
                class=" text-[rgb(8,136,96)]" 
                color=""               
              >
                {{ item.numberrates}} Lượt đánh giá
            </v-btn>
            </VListItemAction>
            <VListItemSubtitle
              class="m2"
              v-text="item.descriptions"
            />
            <VRow class="m-1 d-flex justify-center">
              
              <VCol cols="2"> <v-icon>mdi-heart-outline</v-icon> <VListItemSubtitle v-text="item.love" /></VCol>
              <VCol cols="2"><v-icon>mdi-comment-outline</v-icon> <VListItemSubtitle v-text="item.comment" /></VCol>
              <VCol cols="4"
                ><v-icon>mdi-account-edit-outline</v-icon><VListItemSubtitle v-text="item.username"
              /></VCol>
            </VRow>
          </VCol>
        </VRow>
      </v-carousel-item>
    </v-carousel>
  </VCard>
</template>
<script setup lang="ts">
import { API_URL } from '@/constants'
import { NewHostelReadonly } from '@/types/Numbers'
import { useRequest } from 'vue-request'
const {
  data: newhostels,
  loading,
  error,
} = useRequest<NewHostelReadonly[]>(() => fetch(`${API_URL}/newhostels`).then(res => res.json()))
watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})
const status: Record<NewHostelReadonly['rate'], number> = {
  5: 1,
  4.5: 2,
  4: 3,
  3.5: 4,
  3: 5,
  2.5: 6,
  2: 7,
  1.6: 7,
  1: 9,
  0.5: 10,
  0: 11,
}

const statusColor: Record<(typeof status)[number], string> = {
  1: 'succes',
  2: 'success',
  3: '#66ff00',
  4: '#99ff00',
  5: '#ccff00',
  6: '#ffff00',
  7: '#ffcc00',
  8: '#ff9900',
  9: '#ff6600',
  10: '#ff3300',
  11: '#ff0000',
}
</script>
