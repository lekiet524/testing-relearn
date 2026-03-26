import {test, expect} from '@playwright/test';
import LoginPage from '../pages/login.page';
import { users } from '../utils/test-data';


test ('TC08: Verify input field attributes', async({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    //Verify input username type và placeholder
    await expect(loginPage.userNameInput).toHaveAttribute('type','text');
    await expect(loginPage.userNameInput).toHaveAttribute('placeholder','Username');

    //Verify input password là marked
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');


    console.log("TC08 passed")
})

test('TC09: Verify button states after input', async({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.goto();


    //Verify sau khi đã nhập hết input
    await loginPage.userNameInput.fill(users.stand.username);
    await loginPage.passwordInput.fill(users.stand.password);
    await expect(loginPage.loginButton).toBeEnabled();

    //Verify tên button
    await expect(loginPage.loginButton).toHaveText('Login');
    console.log("TC09 Passed")
})

test('TC10: Verify product list after login successful ', async({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.stand.username, users.stand.password);

    //Verify đủ 6 sản phẩm
    const items = page.locator('.inventory_item')
    await expect(items).toHaveCount(6);


    //Verify tên sản phẩm đầu tiên
    await expect(items.first().locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    //Verify giá sản phẩm phải là $
    await expect(items.first().locator('.inventory_item_pric')).toContainText('$');

    console.log("TC10 Passed")
})