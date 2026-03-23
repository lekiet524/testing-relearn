import {test, expect} from '@playwright/test';

type LoginTestData = {
    name: string;
    username : string;
    password: string;
    error: string;
}

const testData: LoginTestData[] = [
    {
        name: 'TC02: Login với password sai',
        username: 'standard_user',
        password: 'secret1_sauce',
        error: 'Username and password do not match any user in this service'
    },
    {
        name: 'TC03: Login với username sai',
        username: 'standard1_user',
        password: 'secret_sauce',
        error: 'Username and password do not match any user in this service'
    },
    {
        name: 'TC04: Login với username và password sai',
        username: 'standard1_user',
        password: 'secret1_sauce',
        error: 'Username and password do not match any user in this service'
    },
    {
        name: 'TC05: Login để trống username',
        username: '',
        password: 'secret_sauce',
        error: 'Username is required'
    },
    {
        name: 'TC07: Login để trống password',
        username: 'standard_user',
        password: '',
        error: 'Password is required'
    },
    {
        name: 'TC08: Login để trống username và password',
        username: '',
        password: '',
        error: 'Username is required'
    },
];

test('TC01: Login thành công',async({page}) => {
    //1. Truy cập vào https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    //2. Nhập username và password
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    //3. Click login
    await page.locator('[data-test="login-button"]').click();


    //4. Verify: URL chuyển sang trang /inventory.html
    await expect(page).toHaveURL(/.*inventory.html/);
    
    //5 Verify: Hiển thi danh sách sản phẩm
    await expect(page.locator('.inventory_item_name').first()).toBeVisible();

    console.log('Test passed: Login thành công')
    
});

// test('TC02: Login với password sai', async({page}) => {
//     //1. Truy cập vào https://www.saucedemo.com/
//     await page.goto('https://www.saucedemo.com/');

//     //2. Nhập username đúng và password sai
//     await page.locator('[data-test="username"]').fill('standard_user')
//     await page.locator('[data-test="password"]').fill('secret1_sauce')

//     //3. Click login
//     await page.locator('[data-test="login-button"]').click();

//     //4. Verify: Vẫn ở trang /login
//     await expect(page).toHaveURL('https://www.saucedemo.com/');

//     //5. Verify: Hiển thị error message
//     const errorBox = page.locator('[data-test="error"]');
//     await expect(errorBox).toBeVisible();
//     await expect(errorBox).toContainText('Username and password do not match any user in this service');

//     console.log('Test passed: Error handling đúng');

// });

testData.forEach((data) => {
    test(data.name, async({page})=> {
        //1. Truy cập vào https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    //2. Nhập username đúng và password sai
    await page.locator('[data-test="username"]').fill(data.username)
    await page.locator('[data-test="password"]').fill(data.password)

    //3. Click login
    await page.locator('[data-test="login-button"]').click();

    //4. Verify: Vẫn ở trang /login
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    //5. Verify: Hiển thị error message
    const errorBox = page.locator('[data-test="error"]');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText(data.error);

    console.log('Test passed: Error handling đúng');
    })
});