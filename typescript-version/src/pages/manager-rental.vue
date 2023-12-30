<template>
  <main class="px-4">
    <v-data-table
      :headers="headers"
      :items="hostels"
      :sort-by="[{ key: 'title', order: 'asc' }]"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            color="primary"
            dark
            class="mb-2"
            >Hostels Lists</v-toolbar-title
          >
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            @submit.prevent
            :model-value="null !== hotelShow"
            @update:model-value="$event ? void 0 : (hotelShow = null)"
            max-width="1000px"
            transition="dialog-top-transition"
          >
            <!-- <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                Hostel
              </v-btn>
            </template> -->
            <v-row v-if="hotelShow">
              <v-col>
                <v-card class="h-100%">
                  <chart_post_hostel
                    :loading="hotelShow.loading_analytics"
                    :loveandcomment="hotelShow.loveandcomment"
                    :rateproperties="hotelShow.rateproperties"
                  />

                  <v-slider
                    class="w-75% ml-7"
                    align-center
                    v-model="hotelShow.loveandcomment.year"
                    @update:model-value="hotLoadAnalytics(hotelShow, $event)"
                    step="1"
                    :min="hotelShow.range_time_analytics.start"
                    :max="hotelShow.range_time_analytics.end"
                    thumb-label
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="hotelShow.loveandcomment.year"
                        hide-details
                        single-line
                        density="compact"
                        type="number"
                        label="Years"
                        :readonly="true"
                        class="w-30"
                      ></v-text-field> </template
                  ></v-slider>
                  <chart_Rate :rateproperties="hotelShow.rateproperties" />
                </v-card>
              </v-col>
              <v-col>
                <v-form
                  :height="100"
                  @submit.prevent
                  fast-fail
                  ref="vFormAddRef"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Hostel</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="12"
                          >
                            <v-text-field
                              v-model="hotelShow.title"
                              prepend-inner-icon="mdi-checkbook"
                              :rules="[data.rules.required]"
                              label="Title"
                              type="text"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="hotelShow.username"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-account-outline"
                              label="User"
                              type="text"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="5"
                            md="6"
                          >
                            <v-text-field
                              v-model="hotelShow.price"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-currency-usd"
                              type="text"
                              label="Price"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="5"
                            md="4"
                          >
                            <v-text-field
                              v-model="hotelShow.love"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-heart-outline"
                              type="number"
                              label="Love"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="5"
                            md="4"
                          >
                            <v-text-field
                              v-model="hotelShow.comment"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-comment-outline"
                              type="number"
                              label="Comment"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="5"
                            md="4"
                          >
                            <v-text-field
                              v-model="hotelShow.rate"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-star-outline"
                              type="number"
                              label="Rate"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="12"
                          >
                            <v-text-field
                              v-model="hotelShow.address"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-home-city-outline"
                              label="Address"
                              type="text"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="hotelShow.room"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-store"
                              label="Room"
                              type="number"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="hotelShow.emptyroom"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-store-check-outline"
                              label="Empty"
                              type="text"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="12"
                          >
                            <v-text-field
                              v-model="hotelShow.functionRoom"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-store-search-outline"
                              label="Special"
                              type="text"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="12"
                          >
                            <v-text-field
                              v-model="hotelShow.description"
                              :rules="[data.rules.required]"
                              prepend-inner-icon="mdi-subtitles-outline"
                              label="Description"
                              type="text"
                              :readonly="true"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions class="pb-0">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="hotelShow = null"
                      >
                        Close
                      </v-btn>

                      <!-- <v-btn
                          type="submit"
                          color="blue-darken-1"
                          variant="text"
                          :loading="adding"
                          @click="saveAdd"
                        >
                          Save
                        </v-btn> -->
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-col>
            </v-row>
            <p v-else>Hack it thoi</p>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  :loading="deleting"
                  @click="requestDelete"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #item.image="{ item }">
        <v-image
          size="50px"
          color="black"
        >
          <img
            class="w-20 rounded-lg"
            v-if="item.image"
            :src="item.image"
          />
          <v-icon
            v-else
            size="40px"
            >solar:user-circle-bold-duotone</v-icon
          >
        </v-image>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="hotelShow = item"
        >
          mdi-eye
        </v-icon>
        <v-icon
          size="small"
          @click="clickDelete(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
  </main>
</template>

<script lang="ts" setup>
import { API_URL } from '@/constants'
import { useToastStore } from '@/stores/toast'
import { Hostel, HostelReadonly } from '@/types/Hostel'
import Chart_post_hostel from '@/views/dashboard/Chart_post_hostel.vue'
import chart_Rate from '@/views/dashboard/Chart_Rate.vue'
import { useRequest } from 'vue-request'
const toastStore = useToastStore()

const data = {
  email: '',
  rules: {
    required: (value: any) => !!value || 'Required.',
    email: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  },
}

interface Role {
  id: number
  name: string
}
const headers: {
  title: string
  align?: 'center' | 'start' | 'end'
  key: string
  sortable?: boolean
}[] = [
  {
    title: 'Image',
    align: 'start',
    sortable: false,
    key: 'image',
  },
  { title: 'Title', key: 'title' },
  { title: 'User', key: 'username' },
  { title: 'Address', key: 'address' },
  { title: 'Price', key: 'price' },
  { title: 'Actions', key: 'actions', sortable: false },
]
const {
  data: hostels,
  loading,
  error,
} = useRequest<
  (Exclude<HostelReadonly, 'loveandcomment'> & {
    loveandcomment: HostelReadonly['loveandcomment']
    loading_analytics: boolean
  })[]
>(
  () =>
    fetch(`${API_URL}/hostels`)
      .then(res => res.json() as Promise<HostelReadonly[]>)
      .then(hostels =>
        hostels.map(item =>
          shallowReactive({
            ...item,
            loading_analytics: false,
          }),
        ),
      ),
  //  .then(hostels => shallowReactive(hostels)),
)

watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})

const hotelShow = ref<Exclude<typeof hostels.value, undefined>[0x0] | null>(null)
const dialogDelete = ref(false)

import type { VForm } from 'vuetify/components/VForm'
const vFormAddRef = ref<VForm>()

const idHostelRequestDelete = ref<number | null>(null)
const deleting = ref(false)
async function requestDelete() {
  if (idHostelRequestDelete.value === null) return

  deleting.value = true

  try {
    await fetch(`${API_URL}/hostel?id=${idHostelRequestDelete.value}`, {
      method: 'delete',
    })

    idHostelRequestDelete.value = null
    dialogDelete.value = false

    // TODO: notify success
  } catch (err) {
    console.warn(err)
    // TODO: add toast error
  } finally {
    deleting.value = false
  }
}

function clickDelete(hostel: Hostel) {
  dialogDelete.value = true
  idHostelRequestDelete.value = hostel.id
}

const storeAbortAnalytics = new WeakMap<Hostel, AbortController>()
async function hotLoadAnalytics(hotel: Exclude<typeof hostels.value, undefined>[0x0], year: number) {
  storeAbortAnalytics.get(hotel)?.abort()

  const abort = new AbortController()

  hotel.loading_analytics = true
  try {
    const analytics = await fetch(`${API_URL}/hostel-analytics/${hotel.id}?year=${year}`, {
      signal: abort.signal,
    }).then(res => res.json())
    hotel.loveandcomment = analytics
  } catch (err) {
    console.warn(err)
  } finally {
    hotel.loading_analytics = false
  }
  // fucking 😶‍🌫️
}
</script>
