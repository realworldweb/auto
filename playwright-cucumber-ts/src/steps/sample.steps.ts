import { Given, When, Then } from '@cucumber/cucumber';
import { userSessionManager } from '../support/UserSessionManager';

Given('I create a', async (aliases: Array<string>) => {
	await Promise.all(
		aliases.map(async (alias) => userSessionManager.addUser(alias))
	);
});

Given('I set the active user to {string}', (alias: string) => {
	userSessionManager.setActiveUser(alias);
});
