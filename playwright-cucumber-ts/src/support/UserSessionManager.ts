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

	getUserPage: (alias: string): Page | null => {
		const session = sessions.get(alias);
		return session ? session.page : null;
	},

	awaitLogin: async (
		alias: string,
		loginTask: (page: Page) => Promise<void>
	): Promise<void> => {
		const session = sessions.get(alias);
		if (!session) {
			throw new Error(`User with alias "${alias}" does not exist.`);
		}
		await loginTask(session.page);
	},

	runTasksForUsers: async (
		aliases: string[],
		taskMap: Map<string, (page: Page) => Promise<void>>
	): Promise<void> => {
		const tasks = aliases.map(async (alias) => {
			const session = sessions.get(alias);
			if (!session) {
				throw new Error(`User with alias "${alias}" does not exist.`);
			}
			const task = taskMap.get(alias);
			if (!task) {
				throw new Error(`No task found for user with alias "${alias}".`);
			}
			await task(session.page);
		});
		await Promise.all(tasks);
	},
};

export const createSession = async (alias: string): Promise<UserSession> => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	return { alias, page };
};
