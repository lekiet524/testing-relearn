import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    //Selector
    readonly page : Page
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton : Locator
    readonly errorMessage: Locator
    readonly inventoryTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.inventoryTitle = page.locator('.title');
    }

    //Action
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //Assert
    async expectToBeOnLogin() {
        await expect(this.userNameInput).toBeVisible();
    }

    async expectToBeOnInventory() {
         await expect(this.inventoryTitle).toBeVisible();
    }

    async getErrorMessage () {
        return await this.errorMessage.textContent();
    }

    async expectErrorMessage(expected: string) {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 })
        await expect(this.errorMessage).toContainText(expected);
    }
    //Chờ chuyển trang xong
    async waitForNavigation() {
        await this.page.waitForLoadState('networkidle');
    }

    async loginAndWait(username: string, password: string) {
        await this.login(username, password);
        await this.waitForNavigation();
    }

}
export default LoginPage;