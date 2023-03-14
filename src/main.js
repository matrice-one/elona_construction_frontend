import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.elona-construction.ch'  
//  axios.defaults.baseURL = 'http://127.0.0.1:8000'  

 /* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faGaugeHigh, faGlobe, faPiggyBank)

createApp(App).use(store).use(router,axios).component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')