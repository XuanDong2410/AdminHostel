<script setup lang="ts">
import rentals from "@/views/data/rentals.json";
import roles from "@/views/data/role.json";
import users from "@/views/data/users.json";
// let role= roles.find((value)=> value.id === users.idrole);
          // roles.rolename;
let newUsers = users.map((val)=>{
  const { name } = roles.find((value) => value.id === val.idrole)!;
  return {...val,
    rolename: name
  }
})


</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">
          Name
        </th>
        <th class="text-uppercase text-center">
          Gmail
        </th>
        <th class="text-uppercase text-center">
          Role
        </th>
        <th class="text-uppercase text-center">
          Password
        </th>
        <th class="text-uppercase text-center">
          Phone
        </th>
        <th class="text-uppercase text-center">
          Money
        </th>
        <th class="text-uppercase text-center">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in rentals"
        :key="item.id"
      >
        <td class="text-center">
          {{ item.title }}
        </td>
        <td>
          {{ item.addres }}
        </td>
        <td>
          {{ item.description }}
        </td>
        <td class="text-center">
          {{ item.room}}
        </td>
        <td class="text-center">
          {{ item.emptyoom }}
        </td>
        <td class="text-center">
          {{ item.price }}
        </td>
        
        <td class="text-center">
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
