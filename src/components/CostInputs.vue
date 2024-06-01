<script setup lang="ts">
import type { inputsModel } from "@/App.vue";
import { ref, watch } from "vue";

interface props {
  toggle: boolean;
}

const props = defineProps<props>();
const total = ref();

watch(
  () => props.toggle,
  () => {
    onCalculateClear();
  }
);

const monthsFirst = ref<inputsModel[]>([
  { label: "Diciembre", value: null, order: 1 },
  { label: "Enero", value: null, order: 2 },
  { label: "Febrero", value: null, order: 3 },
  { label: "Marzo", value: null, order: 4 },
  { label: "Abril", value: null, order: 5 },
  { label: "Mayo", value: null, order: 6 },
  { label: "Junio", value: null, order: 7 },
  { label: "Julio", value: null, order: 8 },
  { label: "Agosto", value: null, order: 9 },
  { label: "Septiembre", value: null, order: 10 },
  { label: "Octubre", value: null, order: 11 },
  { label: "Noviembre", value: null, order: 12 },
]);

const onCalculateClear = () => {
  monthsFirst.value.map((x) => (x.value = null));
  total.value = null;
};

function returnMonthOrdered() {
  return monthsFirst.value.sort((a, b) => a.order - b.order);
}

const onChange = (params: string) => {
  if (props.toggle) {
    let x = monthsFirst.value.find((x) => x.label == params);
    if (x) {
      if (x.value) {
        // monthsFirst.value.find((x) => x.label == params)!.value = 460;
      }
    }
  } 
};

const onCalculate = () => {
  if (props.toggle) {
    total.value = (
      monthsFirst.value.reduce((acc, el) => {
        return (
          parseFloat((el.value ? el.value : 0).toString()) +
          parseFloat(acc.toString())
        );
      }, 0) / 12
    ).toFixed(2);
  }
};
</script>

<template>
  <VRow v-auto-animate>
    <VCol
      cols="12"
      v-for="month in returnMonthOrdered()"
      :key="month.label"
      class="py-1"
      v-if="toggle">
      <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap">
        <p>{{ month.label }}</p>
        <div class="tw-w-1/2 tw-min-w-20">
          <VTextField
            type="number"
            min="0"
            label="Ingrese el valor"
            v-model="month.value"
            @input="onChange(month.label)"
          />
        </div>
      </div>
    </VCol>
    <VCol cols="12">
      <div class="tw-flex tw-justify-center tw-items-center tw-gap-4">
        <VBtn color="info" @click="onCalculate"> Calcular </VBtn>
        <VBtn color="info" @click="onCalculateClear"> Nuevo calculo </VBtn>
      </div>
    </VCol>
    <VCol cols="12" v-auto-animate>
      <div
        class="tw-flex tw-justify-center tw-items-center tw-gap-4"
        v-if="total"
      >
        <p>
          Valor
          <span class="tw-text-green-600 tw-font-semibold">${{ total }}</span>
        </p>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped></style>
