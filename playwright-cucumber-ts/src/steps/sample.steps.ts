import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { userSessionManager } from '../support/UserSessionManager';
import { matrixGrid } from '../pages';
import { CustomWorld } from '../types/Cucumber';

Given('I create a user session for {string}', async (alias: string) => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	userSessionManager.addUser(alias, page);
});

Given('I set the active user to {string}', (alias: string) => {
	userSessionManager.setActiveUser(alias);
});

When('the active user navigates to {string}', async (url: string) => {
	const page = userSessionManager.getActiveUserPage();
	if (!page) {
		throw new Error('No active user is set.');
	}
	const helper = matrixGrid(page);
	await helper.actions.navigateTo(url);
});

Then('all users navigate to {string}', async (url: string) => {
	const sessions = Array.from(userSessionManager.getAllSessions());
	for (const session of sessions) {
		const helper = matrixGrid(session.page);
		await helper.actions.navigateTo(url);
	}
});

Given<CustomWorld>('I navigate to the application', async function () {
	if (!this.page) {
		throw new Error('Page is not initialized.');
	}
	await this.page.goto('http://localhost:3000'); // Replace with your application's URL
});

When<CustomWorld>('I perform some action', async function () {
	// Add code to perform the action
});

Then<CustomWorld>('I should see the expected result', async function () {
	// Add code to verify the expected result
});
