import './assets/scss/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiFilm, IoStarOutline, FaVoteYea, BiHeartFill } from 'oh-vue-icons/icons'

addIcons(BiFilm, IoStarOutline, FaVoteYea, BiHeartFill)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
