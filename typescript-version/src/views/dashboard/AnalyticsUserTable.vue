<template>
  <VCard>
    <VCardTitle>Top user</VCardTitle>
    <VTable
      v-if="!error && !loading"
      :headers="headers"
      :items="topusers"
      item-key="fullName"
      class="table-rounded"
      hide-default-footer
      disable-sort
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in topusers"
          :key="row.name"
        >
          <!-- name -->

          <td>
            <div class="d-flex flex-column">
              <h6 class="text-sm font-weight-medium">{{ row.name }}</h6>
              <!-- <span class="text-xs">{{ row.phone }}</span> -->
            </div>
          </td>

          <td
            class="text-sm"
            v-text="row.gmail"
          />
          <td
            class="text-sm"
            v-text="`$${row.money}`"
          />

          <!-- status -->
          <td>
            <VChip
              size="small"
              :color="statusColor[status[row.idrole]]"
              class="text-capitalize"
            >
              {{ status[row.idrole] }}
            </VChip>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
<script lang="ts" setup>
import { API_URL } from '@/constants'
import { TopUser, TopUserReadonly } from '@/types/Numbers'
// import dataUser from '@/views/data/users.json'
import { useRequest } from 'vue-request'
// const data: Omit<TopUser, 'avatar'>[] = dataUser
const {
  data: topusers,
  loading,
  error,
} = useRequest<TopUserReadonly[]>(() =>
  fetch(`${API_URL}/topusers`)
    .then(res => res.json())
)
watch(error, error => {
  if (error) {
    // TODO: add control error
    console.warn(error)
  }
})
const status: Record<TopUser['idrole'], string> = {
  1: 'User',
  2: 'Moderator',
  3: 'Owner',
  4: 'Admin',
}

const statusColor: Record<(typeof status)[number], string> = {
  Admin: 'primary',
  Moderator: 'success',
  Owner: 'error',
  User: 'warning',
}

const headers = ['NAME', 'EMAIL', 'MONEY', 'ROLE']

// const usreList = data
</script>
