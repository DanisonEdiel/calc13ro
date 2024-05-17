import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    defaults:{
        VTextField:{
            variant:"outlined",
            density:"compact",
            hideDetails:true
        }
    },
})

export default vuetify
