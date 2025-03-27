import { Page } from '@playwright/test';
import { UserSession } from '../types';
import { chromium } from 'playwright';

const sessions = new Map<string, UserSession>();
let activeUser: UserSession | null = null;

export const userSessionManager = {
	addUser: async (alias: string): Promise<void> => {
		const session = await createSession(alias);
		sessions.set(alias, session);
	},

	setActiveUser: (alias: string): void => {
		const session = sessions.get(alias);
		if (!session) {
			throw new Error(`User with alias "${alias}" does not exist.`);
		}
		activeUser = session;
	},

	getActiveUser: (): UserSession | null => activeUser ?? null,
};

export const createSession = async (alias: string): Promise<UserSession> => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	return { alias, page };
};
