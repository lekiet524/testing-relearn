import {test} from '@playwright/test';
import { beforeEach } from 'node:test';
import { LoginPage } from '../pages/login.page';

const VALID_USER = {username: 'standard_user', password: 'secret_sauce'}
const LOCKET_ID_USER = {username: 'locked_out_user', password: 'secret_sauce'}

test.beforeEach(async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
})


test('TC01: Login thành công',async({page}) => {
    const loginPage = new LoginPage(page);

    //Action
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    //Assert
    await loginPage.expectToBeOnInventory();

    console.log("TC1 Passed");
});

test('TC02: Với user bị khóa',async({page}) => {
   const loginPage = new LoginPage(page);

   //Action
   await loginPage.login(LOCKET_ID_USER.username, LOCKET_ID_USER.password);

   //Assert
   await loginPage.expectToBeOnLogin();
   await loginPage.expectErrorMessage('Sorry, this user has been locked out.');

    console.log("TC2: Passed");
});

// test('TC03: Login với user để trống', async({page}) => {
   

// });

// test('TC04: Login với password để trống', async({page}) => {

// });
