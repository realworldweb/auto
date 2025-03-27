import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './src',
	timeout: 30_000,
	expect: {
		timeout: 5000,
	},
	reporter: 'list',
	use: {
		headless: true,
		actionTimeout: 0,
		trace: 'on-first-retry',
	},
});
