import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VTextField: {
      variant: "outlined",
      density: "compact",
      hideDetails: true,
    },
    VCheckbox: {
      color: "info",
      density: "compact",
      hideDetails: true,
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
      hideDetails: true,
    },
    VBtn: {
      density: "comfortable",
      color: "info",
    },
  },
});

export default vuetify;
