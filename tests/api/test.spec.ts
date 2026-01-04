// tests/api/BookTest.spec.ts
import { test, expect } from '../../api/BaseTestApi';
import { EndPointGlobal } from '../../api/EndPointGlobal';
import { LoginBuilder } from '../../api/LoginBuilder';
import { ConfigsGlobal } from '../../api/ConfigsGlobal';

test.describe('API Tests', () => {

  test('Login test', async ({ requestSpec }) => {
    const loginData = LoginBuilder.getDataLogin();

    const fullUrl = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_LOGIN}`;
    console.log('Login URL:', fullUrl);
    console.log('Login payload:', JSON.stringify(loginData));

    const response = await requestSpec.post(EndPointGlobal.EP_LOGIN, {
      data: JSON.stringify(loginData), // serialize JSON
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Login status:', response.status());
    console.log('Login body:', await response.text());

    expect(response.status()).toBe(200);
  });

  test('Create Book', async ({ requestSpec }) => {
    const newBook = {
      title: 'My Book',
      author: 'Bin Dang'
    };

    const fullUrl = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOKS}`;
    console.log('Create Book URL:', fullUrl);
    console.log('Create Book payload:', JSON.stringify(newBook));

    const response = await requestSpec.post(EndPointGlobal.EP_BOOKS, {
      data: JSON.stringify(newBook),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Create Book status:', response.status());
    const body = await response.json();
    console.log('Created Book:', body);

    expect(response.status()).toBe(200);
  });

});
