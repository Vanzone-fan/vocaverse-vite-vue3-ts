import { createApp } from 'vue';
import './style.css';
import './tailwind.css'; // 引入 tailwind
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'; // 图标样式
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
const primeVueConf = {
	theme: {
		preset: Aura,
		options: {
			prefix: 'p',
			darkModeSelector: 'system',
			cssLayer: false,
		},
	},
};

app.use(router); // 挂载路由
app.use(pinia);

app.use(PrimeVue,primeVueConf);
app.mount('#app');
