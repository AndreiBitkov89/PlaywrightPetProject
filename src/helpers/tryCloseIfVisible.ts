import { Locator } from '@playwright/test';

export async function tryCloseIfVisible(locator: Locator): Promise<void> {
    try {
        if (await locator.isVisible()) {
            await locator.click({ timeout: 500 });
        }
    } catch {
    }
}