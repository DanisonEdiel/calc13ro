import './assets/main.css'

import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugin/vuetify'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'


createApp(App).use(vuetify).use(autoAnimatePlugin).mount('#app')
