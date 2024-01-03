<template>
  <VCard height="auto">
    <VCardTitle> Các phòng trọ nổi bật</VCardTitle>
    <VList
      v-if="!error && !loading"
      :items="tophostels"
      item-props
      lines="three"
      wrap
    >
      <VContainer class="d-flex">
        <VRow>
          <VCol
            v-for="item in tophostels"
            :key="item.id"
            cols="6"
          >
            <v-sheet class="pa-2 ma-2">
              <VRow>
                <VCol
                  cols="12"
                  md="5"
                  ><img
                    width="100%"
                    height="100%"
                    v-if="item.image"
                    :src="item.image"
                /></VCol>
                <VCol>
                  <VListItemTitle
                    class="mx2 pa-2 text-[rgb(48,129,208)] font-weight-bold d-flex justify-center"
                    v-text="item.title" />
                  <VListItemTitle class="text-[rgb(253,132,31)] font-weight-bold">{{ item.price }} VNĐ</VListItemTitle>
                  <VListItemAction>
                    <VChip
                      size="small"
                      class="text-capitalize pa-4 mx2"
                      :color="statusColor[status[item.rate]]"
                    >
                      {{ item.rate }}
                    </VChip>
                    <VListItemSubtitle
                      class="red--text text--lighten-1"
                      size="small"
                      color="#000"
                    >
                      {{ item.numberrates }} lượt đánh giá
                    </VListItemSubtitle>
                  </VListItemAction>
                  <VListItemSubtitle class="my-2 " v-text="item.descriptions" />
                  <VRow class="d-flex justify-center align-center ">
                    <VCol cols="3" class="d-flex justify-center align-center">
                       <v-icon>mdi-heart-outline</v-icon> <VListItemSubtitle v-text="item.love" /></VCol>
                    <VCol cols="3" class="d-flex justify-center align-center"
                      ><v-icon>mdi-comment-outline</v-icon> <VListItemSubtitle v-text="item.comment"
                    /></VCol>
                    <VCol cols="6" class="d-flex justify-center align-center"
                      ><v-icon>mdi-account-edit-outline</v-icon
                      ><VListItemSubtitle
                        v-text="item.username"
                        class="mx-1 px-1"
                    /></VCol>
                   </VRow>
                  </VCol>
              </VRow>
            </v-sheet>
          </VCol>
        </VRow>
      </VContainer>
    </VList>

    <VCardTitle> Các phòng trọ được yêu thích nhất</VCardTitle>
    <VList
      v-if="!error && !loading"
      :items="studenthostels"
      item-props
      lines="three"
      wrap
    >
      <VContainer class="d-flex">
        <VRow>
          <VCol
            v-for="item in studenthostels"
            :key="item.id"
            cols="6"
          >
            <v-sheet class="pa-2 ma-2">
              <VRow>
                <VCol
                  cols="12"
                  md="5"
                  ><img
                    width="100%"
                    height="100%"
                    class="rounded-4"
                    v-if="item.image"
                    :src="item.image"
                /></VCol>
                <VCol>
                  <VListItemTitle
                    class="mx2 pa-2 text-[rgb(48,129,208)] font-weight-bold d-flex justify-center"
                    v-text="item.title"
                  />
                  <VListItemTitle class="text-[rgb(253,132,31)] font-weight-bold">{{ item.price }} VNĐ</VListItemTitle>

                  <VListItemSubtitle class="mt-2" v-text="item.descriptions" />
                  <VRow class="mt-3">
                    <VCol
                      cols="5"
                      class="d-flex justify-center align-center"
                    >
                      <v-icon class=" text-[rgb(254,0,0)]">mdi-heart-outline</v-icon>
                      <VListItemSubtitle v-text="item.love" />
                    </VCol>

                    <VCol
                      cols="7"
                      class="d-flex justify-center align-center"
                      ><v-icon>mdi-account-edit-outline</v-icon
                      ><VListItemSubtitle
                        v-text="item.username"
                        class="mx-1 px-1"
                    /></VCol>
                  </VRow>
                </VCol>
              </VRow>
            </v-sheet>
          </VCol>
        </VRow>
      </VContainer>
    </VList>
  </VCard>
</template>
<script lang="ts" setup>
import { API_URL } from '@/constants'
import { LoveHostelReadonly, TopHostelReadonly } from '@/types/Numbers'
import { useRequest } from 'vue-request'
const { data: tophostels } = useRequest<TopHostelReadonly[]>(() =>
  fetch(`${API_URL}/tophostels`).then(res => res.json()),
)

const {
  data: studenthostels,
  loading,
  error,
} = useRequest<LoveHostelReadonly[]>(() => fetch(`${API_URL}/lovehostels`).then(res => res.json()))
watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})
const data = {
  trip: {
    name: '',
    location: null,
    start: null,
    end: null,
  },
  locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
}
const status: Record<TopHostelReadonly['rate'], number> = {
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
