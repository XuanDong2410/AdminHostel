<template>
  <v-btn
    icon="mdi-plus"
    @click="emitAdd"
  ></v-btn>
  <VTable height="250">
    <thead>
      <tr>
        <th class="text-uppercase">Name</th>
        <th class="text-uppercase text-center">Gmail</th>
        <th class="text-uppercase text-center">Role</th>
        <th class="text-uppercase text-center">Password</th>
        <th class="text-uppercase text-center">Phone</th>
        <th class="text-uppercase text-center">Money</th>
        <th class="text-uppercase text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in users"
        :key="item.id"
      >
        <td class="text-center">
          {{ item.name }}
        </td>
        <td>
          {{ item.gmail }}
        </td>
        <td>
          {{ item.rolename }}
        </td>
        <td class="text-center">
          {{ item.password }}
        </td>
        <td class="text-center">
          {{ item.phone }}
        </td>
        <td class="text-center">
          {{ item.money }}
        </td>
        <td class="text-center">
          <v-btn
            icon="basil:edit-outline"
            @click="emitEdit(item)"
          />
          <v-btn
            icon="mdi-eye-outline"
            @click="emitView(item)"
          />
          <v-btn
            icon="mdi-delete-outline"
            @click="emitDelete(item)"
          />
        </td>
      </tr>
    </tbody>
  </VTable>

  <v-container>
    <v-row justify="end">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="15"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <!-- Dialog Add -->
  <v-dialog
    max-width="800px"
    align:text-center
    :model-value="userAdding !== null"
    @update:model-value="$event ? void 0 : (userAdding = null)"
  >
    <template v-if="userAdding">
      <VForm @submit.prevent>
        <VRow>
          <!-- 👉 First Name -->
          <VCol cols="12">
            <VRow no-gutters>
              <VCol cols="12">
                <VTextField
                  v-model="userAdding!.name"
                  prepend-inner-icon="mdi-account-outline"
                  placeholder="Name"
                  persistent-placeholder
                />
              </VCol>
            </VRow>
          </VCol>

          <!-- 👉 Email -->
          <VCol cols="12">
            <VRow no-gutters>
              <VCol cols="12">
                <VTextField
                  v-model="userAdding!.gmail"
                  prepend-inner-icon="mdi-email-outline"
                  placeholder="Email"
                  persistent-placeholder
                />
              </VCol>
            </VRow>
          </VCol>

          <!-- 👉 Mobile -->
          <VCol cols="12">
            <VRow no-gutters>
              <VCol cols="12">
                <VTextField
                  v-model="userAdding!.phone"
                  type="number"
                  prepend-inner-icon="mdi-cellphone"
                  placeholder="Phone"
                  persistent-placeholder
                />
              </VCol>
            </VRow>
          </VCol>

          <!-- 👉 Password -->
          <VCol cols="12">
            <VRow no-gutters>
              <VCol cols="12">
                <VTextField
                  v-model="userAdding!.password"
                  prepend-inner-icon="mdi-lock-outline"
                  type="password"
                  label="Password"
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12">
            <VRow no-gutters>
              <VCol cols="12">
                <VSelect
                  v-model="userAdding!.idrole"
                  prepend-inner-icon="mdi-shield-account"
                  placeholder="Role"
                  :items="Roles"
                  item-title="name"
                  item-value="id"
                  label="Role"
                >
                </VSelect>
              </VCol>
            </VRow>
          </VCol>
          <!-- 👉 submit and reset button -->
          <VCol
            offset-md="3"
            cols="12"
            md="9"
            class="d-flex gap-4"
          >
            <VBtn type="submit"> Add </VBtn>
            <VBtn
              color="secondary"
              type="reset"
              variant="tonal"
            >
              Close
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </template>
  </v-dialog>
  <!-- /Dialog Add -->

  <!-- Dialog Edit -->
  <v-dialog
    max-width="800px"
    align:text-center
    :model-value="userEditing !== null"
    @update:model-value="$event ? void 0 : (userEditing = null)"
  >
    <template v-if="userEditing">
      <v-card>
        <V-card-title>
          <v-icon icon="mdi-edit" />
          Edit User
        </V-card-title>
        <v-card-text>
          <VForm @submit.prevent="onRequestEdit">
            <VRow>
              <!-- 👉 First Name -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userEditing!.name"
                      prepend-inner-icon="mdi-account-outline"
                      label="Name"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userEditing!.gmail"
                      prepend-inner-icon="mdi-email-outline"
                      label="Email"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Mobile -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userEditing!.phone"
                      type="number"
                      prepend-inner-icon="mdi-cellphone"
                      label="Phone"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Password -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userEditing!.password"
                      prepend-inner-icon="mdi-lock-outline"
                      type="text"
                      label="Password"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userEditing!.money"
                      prepend-inner-icon="mdi-cash"
                      type="text"
                      label="Money"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VSelect
                      v-model="userEditing!.idrole"
                      prepend-inner-icon="mdi-shield-account"
                      :items="Roles"
                      placeholder="Role"
                      item-title="name"
                      item-value="id"
                      label="Role"
                    >
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <!-- 👉 submit and reset button -->
            </VRow>
            <VRow>
              <VCol
                offset-md="3"
                cols="12"
                class="d-flex gap-4"
              >
                <VBtn type="submit"> Submit </VBtn>
                <VBtn
                  color="secondary"
                  type="button"
                  variant="tonal"
                  @click="userEditing = null"
                >
                  Close
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
  <!-- /Dialog -->
  <!-- Dialog View-->
  <v-dialog
    max-width="800px"
    align:text-center
    :model-value="userViewing !== null"
    @update:model-value="$event ? void 0 : (userViewing = null)"
  >
    <template v-if="userViewing">
      <v-card>
        <V-card-title>
          <v-icon icon="mdi-edit" />
          View User
        </V-card-title>
        <v-card-text>
          <VForm>
            <VRow>
              <!-- 👉 First Name -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userViewing!.name"
                      prepend-inner-icon="mdi-account-outline"
                      label="Name"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userViewing!.gmail"
                      prepend-inner-icon="mdi-email-outline"
                      label="Email"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Mobile -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userViewing!.phone"
                      type="number"
                      prepend-inner-icon="mdi-cellphone"
                      label="Phone"
                    />
                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 Password -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userViewing!.password"
                      prepend-inner-icon="mdi-lock-outline"
                      type="text"
                      label="Password"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VTextField
                      v-model="userViewing!.money"
                      prepend-inner-icon="mdi-cash"
                      type="text"
                      label="Money"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12">
                    <VSelect
                      v-model="userViewing!.idrole"
                      prepend-inner-icon="mdi-shield-account"
                      :items="Roles"
                      placeholder="Role"
                      item-title="name"
                      item-value="id"
                      label="Role"
                    >
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <!-- 👉 submit and reset button -->
            </VRow>
            <VRow>
              <VCol
                offset-md="3"
                cols="12"
                class="d-flex gap-4"
              >
                <VBtn
                  type="button"
                  @click="userViewing = null"
                >
                  Close
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
  <!-- /Dialog -->
  <!--Dialog Delete-->
  <v-dialog
    max-width="400px"
    align:text-center
    :model-value="userDeleting !== null"
    @update:model-value="$event ? void 0 : (userDeleting = null)"
  >
    <v-card>
      <v-card-title> Delete </v-card-title>
      <v-card-text> Do you want to delete ? </v-card-text>
      <v-card-actions>
        <VForm>
          <VRow>
            <VCol
              offset-md="3"
              cols="12"
              class="d-flex gap-4"
            >
              <VBtn type="button"> Delete </VBtn>
              <VBtn
                color="secondary"
                type="button"
                variant="tonal"
                @click="userDeleting = null"
              >
                Close
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- /Dialog -->
</template>

<script setup lang="ts">
import users from '@/views/data/users.json'

import Roles from '@/views/data/role.json'
interface Role {
  id: number
  name: string
}

const page = 6
const userAdding = ref<Omit<(typeof users)[0x0], 'id' | 'rolename'> | null>(null)
const userEditing = ref<(typeof users)[0x0] | null>(null)
const userViewing = ref<(typeof users)[0x0] | null>(null)
const userDeleting = ref<(typeof users)[0x0] | null>(null)
function emitAdd() {
  userAdding.value = {
    name: '',
    gmail: '',
    password: '',
    phone: '',
    idrole: 4,
    money: 0,
  }
}
function emitEdit(item: (typeof users)[0x0]) {
  console.log(`[UserTable]: Emit request edit user`, item)

  userEditing.value = { ...item }
}
function emitView(item: (typeof users)[0x0]) {
  userViewing.value = { ...item }
}
function emitDelete(item: (typeof users)[0x0]) {
  userDeleting.value = { ...item }
}
async function onRequestEdit() {
  console.log('Update', toRaw(userEditing.value))

  const data = await fetch('api/user', {
    method: 'post',
    body: new URLSearchParams(toRaw(userEditing!) as unknown as Record<string, string>),
  }).then(res => res.json())

  if (data.isOk) {
    // update local value
    const local = users.find(item => item.id === userEditing.value?.id)
    if (local) Object.assign(local, userEditing.value)

    // notify

    return
  }

  // throw error
}
</script>
