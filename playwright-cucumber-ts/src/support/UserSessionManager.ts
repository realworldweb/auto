import { Page } from '@playwright/test';
import { UserSession } from '../types';

const sessions = new Map<string, UserSession>();
let activeUser: UserSession | null = null;

export const userSessionManager = {
	addUser: (alias: string, page: Page): void => {
		const session = { alias, page };
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

	getUserPage: (alias: string): Page | null => {
		const session = sessions.get(alias);
		return session ? session.page : null;
	},
};
