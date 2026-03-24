import {test} from '@playwright/test';

import { LoginPage } from '../pages/login.page';

const EMPTY = '';

test.beforeEach(async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
})

test('TC03: Login với username bỏ trống',async({page})=> {
    const loginPage = new LoginPage(page);

    //Action
    await loginPage.login(EMPTY, 'secret_sauce');

    //Assert
    await loginPage.expectErrorMessage('Username is required');
})
test('TC04: Login với password bỏ trống',async({page})=> {
    const loginPage = new LoginPage(page);

    //Action
    await loginPage.login('standard_user', EMPTY);

    //Assert
    await loginPage.expectErrorMessage('Password is required');
})