import './assets/main.css'

import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugin/vuetify'

createApp(App).use(vuetify).mount('#app')
