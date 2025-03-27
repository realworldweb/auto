import { Page } from '@playwright/test';

export const actions = {
	navigateTo: async (page: Page, url: string): Promise<void> => {
		await page.goto(url);
	},

	click: async (page: Page, selector: string): Promise<void> => {
		await page.click(selector);
	},

	type: async (page: Page, selector: string, text: string): Promise<void> => {
		await page.fill(selector, text);
	},
};

export const getTitle = async (page: Page): Promise<string> => {
	return await page.title();
};

export const getText = async (
	page: Page,
	selector: string
): Promise<string> => {
	return await page.innerText(selector);
};
