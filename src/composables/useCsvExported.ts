import type { client } from "@/components/FormExported.vue";
import {
  mkConfig,
  generateCsv,
  download,
  type ColumnHeader,
} from "export-to-csv";

const columnHeaders: ColumnHeader[] = [
  { key: "identity", displayLabel: "Cédula (Ejm.:0502366503)" },
  { key: "name", displayLabel: "Nombres" },
  { key: "lastname", displayLabel: "Apellidos" },
  { key: "gender", displayLabel: "Genero (Masculino=M ó Femenino=F)" },
  { key: "iessCode", displayLabel: "Ocupación" },
  {
    key: "totalEarned",
    displayLabel: "Total_ganado",
  },
  {
    key: "workedDays",
    displayLabel: "Días laborados (360 días equivalen a un ańo)",
  },
  {
    key: "payType",
    displayLabel:
      "Tipo de Pago(Pago Directo=P Acreditación en Cuenta=A Retencion Pago Directo=RP Retencion Acreditación en Cuenta=RA)",
  },
  {
    key: "isPartialTime",
    displayLabel:
      "Solo si el trabajador posee JORNADA PARCIAL PERMANENTE ponga una X",
  },
  {
    key: "hoursPartiaTime",
    displayLabel:
      "DETERMINE EN HORAS LA JORNADA PARCIAL PERMANENTE SEMANAL ESTIPULADO EN EL CONTRATO",
  },
  {
    key: "hasDisability",
    displayLabel:
      "Solo si su trabajador posee algun tipo de discapacidad ponga una X",
  },
  {
    key: "retentionValue",
    displayLabel: "Ingrese el valor retenido",
  },
  {
    key: "isMonthly",
    displayLabel:
      "SOLO SI SU TRABAJADOR MENSUALIZA EL PAGO DE LA DECIMOTERCER REMUNERACIÓN PONGA UNA X",
  },
];
const csvConfig = mkConfig({
  columnHeaders: columnHeaders,
  fieldSeparator: ";",
});

const downloadCsv = (params: client[]) => {
  //@ts-ignore
  const csv = generateCsv(csvConfig)(params);
  download(csvConfig)(csv);
};

const useCsvExported = () => {
  return {
    downloadCsv,
  };
};

export default useCsvExported;
