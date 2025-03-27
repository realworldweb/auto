import { Page } from '@playwright/test';

export type UserSession = {
	alias: string;
	page: Page;
};
