<template>
  <main class="px-4">
    <v-data-table
      :headers="headers"
      :items="posts"
      :sort-by="[{ key: 'title', order: 'asc' }]"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Posts</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            @submit.prevent
            v-model="dialogAdd"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                Add post
              </v-btn>
            </template>
            <v-form
              @submit.prevent
              fast-fail
              ref="vFormAddRef"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ addingPost.__ADD__ ? 'Add Post' : 'Edit Post' }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="5"
                        md="6"
                      >
                        <v-text-field
                          v-model="addingPost.title"
                          prepend-inner-icon="mdi-account-outline"
                          :rules="[data.rules.required]"
                          label="Title"
                          type="text"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col
                        cols="12"
                        sm="5"
                        md="6"
                      >
                        <v-text-field
                          v-model="addingPost.descriptions"
                          :rules="[data.rules.required]"
                          prepend-inner-icon="mdi-email-outline"
                          type="text"
                          label="User"
                        ></v-text-field>
                      </v-col> -->

                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="addingPost.descriptions"
                          :rules="[data.rules.required]"
                          prepend-inner-icon="mdi-cellphone"
                          label="Description"
                          type="text"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="cancelAdd"
                  >
                    Cancel
                  </v-btn>

                  <v-btn
                    type="submit"
                    color="blue-darken-1"
                    variant="text"
                    :loading="adding"
                    @click="saveAdd"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
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
        <v-avatar
          size="40px"
          color="black"
        >
          <img
            v-if="item.image"
            :src="item.image"
          />
          <v-icon
            v-else
            size="40px"
            >solar:user-circle-bold-duotone</v-icon
          >
        </v-avatar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="clickEdit(item)"
        >
          mdi-pencil
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
import { Post, PostReadonly } from '@/types/Post'

import { useRequest } from 'vue-request'

const toastStore = useToastStore()

const data = {
  rules: {
    required: (value: any) => !!value || 'Required.',
    email: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  },
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
  { title: 'Description', key: 'descriptions' },
  { title: 'Time', key: 'time' },
  { title: 'Actions', key: 'actions', sortable: false },
]
const {
  data: posts,
  loading,
  error,
} = useRequest<PostReadonly[]>(() =>
  fetch(`${API_URL}/posts`)
    .then(res => res.json())
    .then(posts => shallowReactive(posts)),
)

watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})

const dialogAdd = ref(false)
const dialogDelete = ref(false)

const DefaultPost = Object.freeze({
  title: '',
  descriptions: '',
  __ADD__: true,
})
const addingPost = ref<Omit<Post, 'id' | 'iduser' | 'image' | 'time'> & { __ADD__?: boolean }>({
  ...DefaultPost,
})

function cancelAdd() {
  addingPost.value = { ...DefaultPost }
  dialogAdd.value = false
}

import type { VForm } from 'vuetify/components/VForm'
const vFormAddRef = ref<VForm>()

const adding = ref(false)
async function saveAdd() {
  if (!(await vFormAddRef.value?.validate())?.valid) return

  adding.value = true

  const isAdd = addingPost.value.__ADD__

  try {
    const newPost: Post = await fetch(`${API_URL}/post`, {
      method: isAdd ? 'post' : 'PATCH',
      body: new URLSearchParams({
        ...addingPost.value,
      } as unknown as Record<string, string>),
    }).then(res => res.json())

    if (isAdd) posts.value?.push(newPost)
    else posts.value?.splice(posts.value.findIndex(item => item.id === newPost.id) >>> 0, 1, newPost)

    cancelAdd()

    // TODO: notify success
    toastStore.create({
      message: 'Thanh cong',
      color: 'success',
    })
  } catch (err) {
    console.warn(err)
    toastStore.create({
      message: 'Khong thanh cong',
      color: 'error',
    })
    // TODO: add toast error
  } finally {
    adding.value = false
  }
}

const idPostRequestDelete = ref<number | null>(null)
const deleting = ref(false)
async function requestDelete() {
  if (idPostRequestDelete.value === null) return

  deleting.value = true

  try {
    await fetch(`${API_URL}/post?id=${idPostRequestDelete.value}`, {
      method: 'delete',
    })

    idPostRequestDelete.value = null
    dialogDelete.value = false

    // TODO: notify success
  } catch (err) {
    console.warn(err)
    // TODO: add toast error
  } finally {
    deleting.value = false
  }
}

function clickDelete(post: Post) {
  dialogDelete.value = true
  idPostRequestDelete.value = post.id
}
function clickEdit(post: Post) {
  dialogAdd.value = true
  addingPost.value = post
}
</script>
