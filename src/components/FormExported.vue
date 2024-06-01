<script setup lang="ts">
import useCsvExported from "@/composables/useCsvExported";
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import useClientRules from "@/composables/useClientRules";
import ClientTable from "./ClientTable.vue";

export interface client {
  identity: string;
  name: string;
  lastname: string;
  iessCode: string;
  workedDays: number;
  gender: "M" | "F";
  payType: "A" | "P" | "RP" | "RA";
  isPartialTime: null | "X";
  hoursPartiaTime: number;
  hasDisability: null | "X";
  isMonthly: null | "X";
  totalEarned: number;
  retentionValue: string;
}

const { downloadCsv } = useCsvExported();
const { clientRules } = useClientRules();
const clients = ref<client[]>([]);
const newRecord = ref<client>({} as client);
const showClients = ref(false);
const snackbar = ref(false);
const validator = useVuelidate(clientRules, newRecord);
const payTypeDropDown = ref([
  { key: "P", label: "Pago Directo" },
  { key: "A", label: "Acreditación en Cuenta" },
  { key: "RP", label: "Retencion Pago Directo" },
  { key: "RA", label: "Retencion Acreditación en Cuenta" },
]);

const onDownload = () => {
  downloadCsv(clients.value);
};

const onRecordAdd = () => {
  validator.value.$validate();
  if (!validator.value.$error) {
    if (clients.value.find((x) => x.identity == newRecord.value.identity)) {
      snackbar.value = true;
      return;
    }
    clients.value.push(newRecord.value);
    newRecord.value = {} as client;
    validator.value.$reset();
  }
};

const onDelete = (index: client) => {
  clients.value = clients.value.filter((x) => x.identity != index.identity);
  if (clients.value.length <= 0) {
    showClients.value = false;
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="tw-flex tw-gap-2">
        <VBtn @click="onDownload" color="info" :disabled="clients.length <= 0">
          Descargar
        </VBtn>
        <VBtn
          @click="showClients = true"
          color="info"
          v-if="clients.length > 0"
        >
          <div class="tw-flex tw-gap-1">
            <p>Clientes</p>
            <p>({{ clients.length }})</p>
          </div>
        </VBtn>
      </div>
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Cedula"
        v-model="newRecord.identity"
        :errorMessages="
          validator.identity.$errors.map((x) => x.$message.toString())
        "
        type="number"
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Nombres"
        v-model="newRecord.name"
        :errorMessages="
          validator.name.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Apellidos"
        v-model="newRecord.lastname"
        :errorMessages="
          validator.lastname.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VSelect
        label="Genero"
        v-model="newRecord.gender"
        :items="[
          { key: 'M', label: 'Masculino' },
          { key: 'F', label: 'Femenino' },
        ]"
        item-title="label"
        item-value="key"
        :errorMessages="
          validator.gender.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Ocupacion IESS"
        v-model="newRecord.iessCode"
        :errorMessages="
          validator.iessCode.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Total ganado"
        v-model="newRecord.totalEarned"
        type="number"
        :errorMessages="
          validator.retentionValue.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Días de trabajo"
        v-model="newRecord.workedDays"
        type="number"
        :errorMessages="
          validator.workedDays.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VSelect
        label="Tipo de pago"
        :items="payTypeDropDown"
        item-title="label"
        item-value="key"
        v-model="newRecord.payType"
        :errorMessages="
          validator.payType.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>

    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Valor retenido"
        v-model="newRecord.retentionValue"
        :disabled="!newRecord.totalEarned"
        :errorMessages="
          validator.retentionValue.$errors.map((x) => x.$message.toString())
        "
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VCheckbox
        label="Tiene discapacidad?"
        v-model="newRecord.hasDisability"
        true-value="X"
        :false-value="null"
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VCheckbox
        label="Tiene jornada parcial?"
        v-model="newRecord.isPartialTime"
        true-value="X"
        :false-value="null"
      />
    </VCol>
    <VCol cols="12" md="6" lg="4">
      <VTextField
        label="Horas parciales"
        :disabled="newRecord.isPartialTime == null"
        :errorMessages="
          validator.hoursPartiaTime.$errors.map((x) => x.$message.toString())
        "
        v-model="newRecord.hoursPartiaTime"
      />
    </VCol>

    <VCol cols="12" md="6" lg="4">
      <VCheckbox
        label="Mensualiza decimos?"
        v-model="newRecord.isMonthly"
        true-value="X"
        :false-value="null"
      />
    </VCol>

    <VCol cols="12">
      <div class="tw-flex tw-justify-end">
        <VBtn @click="onRecordAdd">Agregar</VBtn>
      </div>
    </VCol>
    <VDialog max-width="1000" v-model="showClients">
      <ClientTable :clients="clients" @delete="onDelete" />
    </VDialog>
    <VSnackbar v-model="snackbar" color="error">
      Ya hay un registro con el documento {{ newRecord.identity }}
    </VSnackbar>
  </VRow>
</template>

<style scoped></style>
