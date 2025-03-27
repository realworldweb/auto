import { actions } from './pageActions';
import { mappings } from './pageMappings';
import { assertions } from './pageAssertions';
import { Page } from '@playwright/test';

export const matrixGrid = (page: Page) => ({
	actions: {
		navigateTo: async (url: string) => await actions.navigateTo(page, url),
		click: async (selector: string) => await actions.click(page, selector),
		type: async (selector: string, text: string) =>
			await actions.type(page, selector, text),
	},
	mappings,
	assertions: {
		getTitle: async () => await assertions.getTitle(page),
		getText: async (selector: string) =>
			await assertions.getText(page, selector),
		isVisible: async (selector: string) =>
			await assertions.isVisible(page, selector),
	},
});
