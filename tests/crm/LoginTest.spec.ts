import { test } from '../BaseTest';

test.describe('CRM Test Suite', () => {

    test('Login Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.loginPage().verifyLoginSuccess();
    });

    test('Login Failed With Invalid Email', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin123@example.com', '123456');
        await pages.loginPage().verifyLoginFail("Invalid email or password");
    });

    test('Login Failed With Invalid Password', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456789');
        await pages.loginPage().verifyLoginFail("Invalid email or password");
    });

    test('Login Failed With Blank Email', async ({ pages }) => {
        await pages.loginPage().loginCRM('', '123456789');
        await pages.loginPage().verifyLoginFail("The Email Address field is required.");
    });

    test('Login Failed With Blank Password', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '');
        await pages.loginPage().verifyLoginFail("The Password field is required.");
    });
});
