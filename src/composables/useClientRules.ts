import { required, requiredIf } from "@vuelidate/validators";

const clientRules = {
  identity: {
    required,
  },
  name: {
    required,
  },
  lastname: {
    required,
  },
  iessCode: {
    required,
  },
  workedDays: {
    required,
  },
  gender: {
    required,
  },
  payType: {
    required,
  },
  hoursPartiaTime: {
    //@ts-ignore
    requiredIf: requiredIf((_: any, sibling: any) => {
      return sibling.isPartialTime == "X";
    }),
  },
  retentionValue: {
    //@ts-ignore
    requiredIf: requiredIf((_: any, sibling: any) => {
      return sibling.totalEarned;
    }),
  },
};

const useClientRules = () => {
  return {
    clientRules,
  };
};

export default useClientRules;
