<script setup lang="ts">
import { ref } from "vue";
import CostInputs from "./components/CostInputs.vue";
import { watch } from "vue";

export interface inputsModel {
  label: string;
  value: number | null;
  order: number;
}

const toggle = ref(true);
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <div
          class="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-gap-2"
        >
          <h3 class="tw-text-xl">Seleccione la región</h3>
          <v-btn-toggle
            v-model="toggle"
            rounded="xl"
            color="info"
            mandatory
            density="compact"
          >
            <v-btn :value="true"> Sierra y Amazonía </v-btn>
            <v-btn :value="false"> Costa y Galápagos </v-btn>
          </v-btn-toggle>
        </div>
      </VCol>
      <VCol>
        <CostInputs :toggle="toggle" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped></style>
