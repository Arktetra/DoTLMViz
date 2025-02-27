import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/model/': 'http://127.0.0.1:5000',
			'/ckpt/': 'http://127.0.0.1:5000',
			'/embed/': 'http://127.0.0.1:5000',
		}
	}
});
