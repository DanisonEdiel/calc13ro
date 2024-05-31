<script setup lang="ts">
import type { client } from "./FormExported.vue";

interface props {
  clients: client[];
}

const props = defineProps<props>();
const emit = defineEmits(["delete"]);
</script>

<template>
  <VTable height="400px">
    <thead>
      <tr>
        <th class="text-left">Documento</th>
        <th class="text-left">Nombres</th>
        <th class="text-left">Apellidos</th>
        <th class="text-left tw-w-20"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.clients">
        <td>{{ item.identity }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.lastname }}</td>
        <td>
          <VBtn
            density="comfortable"
            icon="mdi-trash-can"
            variant="tonal"
            color="error"
            @click="emit('delete', item)"
          />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<style scoped></style>
