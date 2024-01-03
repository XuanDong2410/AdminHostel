<template>
  <main class="px-4">
    <v-data-table
      :headers="headers"
      :items="users"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>
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
                Add user
              </v-btn>
            </template>
            <v-form
              @submit.prevent
              fast-fail
              ref="vFormAddRef"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ addingUser.__ADD__ ? 'Add User' : 'Edit User' }}</span>
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
                          v-model="addingUser.name"
                          prepend-inner-icon="mdi-account-outline"
                          :rules="[data.rules.required]"
                          label="Name"
                          type="text"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="5"
                        md="6"
                      >
                        <v-text-field
                          v-model="addingUser.gmail"
                          :rules="[data.rules.required, data.rules.email]"
                          prepend-inner-icon="mdi-email-outline"
                          type="email"
                          label="Email"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="addingUser.phone"
                          :rules="[data.rules.required]"
                          prepend-inner-icon="mdi-cellphone"
                          label="Phone"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-select
                          v-model="addingUser.idrole"
                          :rules="[data.rules.required]"
                          prepend-inner-icon="mdi-shield-account"
                          label="Role"
                          :items="Roles"
                          placeholder="Role"
                          item-title="name"
                          item-value="id"
                        ></v-select>
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
      <template #item.avatar="{ item }">
        <v-avatar
          size="40px"
          color="black"
        >
          <img
            v-if="item.avatar"
            :src="item.avatar"
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
import { User, UserReadonly } from '@/types/User'
import Roles from '@/views/data/role.json'
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
    title: 'Avatar',
    align: 'start',
    sortable: false,
    key: 'avatar',
  },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'gmail' },
  { title: 'Phone', key: 'phone' },
  { title: 'Money', key: 'money' },
  { title: 'Role', key: 'rolename', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
]
const {
  data: users,
  loading,
  error,
} = useRequest<UserReadonly[]>(() =>
  fetch(`${API_URL}/user`)
    .then(res => res.json())
    .then(users => shallowReactive(users)),
)

watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})

const dialogAdd = ref(false)
const dialogDelete = ref(false)

const DefaultUser = Object.freeze({
  name: '',
  gmail: '',
  phone: '',
  idrole: 4,
  __ADD__: true,
})
const addingUser = ref<Omit<User, 'id' | 'rolename' | 'avatar' | 'money'> & { __ADD__?: boolean }>({
  ...DefaultUser,
})

function cancelAdd() {
  addingUser.value = { ...DefaultUser }
  dialogAdd.value = false
}

import type { VForm } from 'vuetify/components/VForm'
const vFormAddRef = ref<VForm>()

const adding = ref(false)
async function saveAdd() {
  if (!(await vFormAddRef.value?.validate())?.valid) return

  adding.value = true

  const isAdd = addingUser.value.__ADD__

  try {
    const newUser: User = await fetch(`${API_URL}/user`, {
      method: isAdd ? 'post' : 'PATCH',
      body: new URLSearchParams({
        ...addingUser.value,
      } as unknown as Record<string, string>),
    }).then(res => res.json())

    if (isAdd) users.value?.push(newUser)
    else users.value?.splice(users.value.findIndex(item => item.id === newUser.id) >>> 0, 1, newUser)

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

const idUserRequestDelete = ref<number | null>(null)
const deleting = ref(false)
async function requestDelete() {
  if (idUserRequestDelete.value === null) return

  deleting.value = true

  try {
    await fetch(`${API_URL}/user?id=${idUserRequestDelete.value}`, {
      method: 'delete',
    })

    idUserRequestDelete.value = null
    dialogDelete.value = false

    // TODO: notify success
  } catch (err) {
    console.warn(err)
    // TODO: add toast error
  } finally {
    deleting.value = false
  }
}

function clickDelete(user: User) {
  dialogDelete.value = true
  idUserRequestDelete.value = user.id
}
function clickEdit(user: User) {
  dialogAdd.value = true
  addingUser.value = user
}
</script>
