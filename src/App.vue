<script setup lang="ts">
import { ref } from "vue";
import CostInputs from "./components/CostInputs.vue";
import FormExported from "./components/FormExported.vue";

export interface inputsModel {
  label: string;
  value: number | null;
  order: number;
}

const toggle = ref(true);
const tab = ref("one");
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VTabs v-model="tab" density="compact" mandatory>
          <VTab value="one">Calculadora</VTab>
          <VTab value="two">Formulario</VTab>
        </VTabs>
      </VCol>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
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
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <FormExported />
        </v-tabs-window-item>
      </v-tabs-window>
    </VRow>
  </VContainer>
</template>

<style scoped></style>
