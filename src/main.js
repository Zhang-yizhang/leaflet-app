import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css';

// 引入Leaflet
import 'leaflet'
import 'leaflet/dist/leaflet.css'

// 引入Map
import Map from './components/Map/index'
const app = createApp(App)
app.use(ElementPlus)
    .use(Map)
    .mount('#app')
