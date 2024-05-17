<script setup lang="ts">
import type { inputsModel } from "@/App.vue";
import { ref, watch } from "vue";

interface props {
  toggle: boolean;
}

const props = defineProps<props>();

watch(
  () => props.toggle,
  () => {
    if (props.toggle) {
      months.value.map((x) => {
        x.value = null;
        if (x.order + 7 > 12) {
          x.order = x.order - 5;
        } else {
          x.order = x.order + 7;
        }
      });
    } else {
      months.value.map((x) => {
        x.value = null;
        if (x.order - 7 < 1) {
          x.order = x.order + 5;
        } else {
          x.order = x.order - 7;
        }
      });
    }
  }
);

const months = ref<inputsModel[]>([
  { label: "Marzo", value: null, order: 8 },
  { label: "Abril", value: null, order: 9 },
  { label: "Mayo", value: null, order: 10 },
  { label: "Junio", value: null, order: 11 },
  { label: "Julio", value: null, order: 12 },
  { label: "Agosto", value: null, order: 1 },
  { label: "Septiembre", value: null, order: 2 },
  { label: "Octubre", value: null, order: 3 },
  { label: "Noviembre", value: null, order: 4 },
  { label: "Diciembre", value: null, order: 5 },
  { label: "Enero", value: null, order: 6 },
  { label: "Febrero", value: null, order: 7 },
]);

const onCalculateClear = () => {
  months.value.map((x) => (x.value = null));
};

function returnMonthOrdered() {
  return months.value.sort((a, b) => a.order - b.order);
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      v-for="month in returnMonthOrdered()"
      :key="month.label"
      class="py-1"
    >
      <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap">
        <p>{{ month.label }}</p>
        <div class="tw-w-1/2 tw-min-w-20">
          <VTextField
            type="number"
            label="Ingrese el valor"
            v-model="month.value"
          />
        </div>
      </div>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-center tw-items-center tw-gap-4">
        <VBtn color="info"> Calcular </VBtn>
        <VBtn color="info" @click="onCalculateClear"> Nuevo calculo </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
