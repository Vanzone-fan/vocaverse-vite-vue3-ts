import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { Plugin } from 'postcss';

const config: { plugins: Plugin[] } = {
	plugins: [tailwindcss(), autoprefixer()],
};

export default config;
