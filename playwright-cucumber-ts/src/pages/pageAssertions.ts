import { Page } from '@playwright/test';

export const assertions = {
	getTitle: async (page: Page): Promise<string> => {
		return await page.title();
	},

	getText: async (page: Page, selector: string): Promise<string> => {
		return await page.innerText(selector);
	},

	isVisible: async (page: Page, selector: string): Promise<boolean> => {
		return await page.isVisible(selector);
	},
};
