import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssConfig from './postcss.config.ts';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: postcssConfig,
	},
	plugins: [
		vue(),
		Components({
			resolvers: [PrimeVueResolver()],
		}),
	],

});
