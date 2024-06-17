import './assets/scss/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaFlag, RiZhihuFill } from 'oh-vue-icons/icons'
import { RiEyeLine } from 'oh-vue-icons/icons'
addIcons(FaFlag, RiZhihuFill, RiEyeLine)

const app = createApp(App)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
