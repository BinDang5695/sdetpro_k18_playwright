// api/BaseTestApi.ts
import { test as base, expect, APIRequestContext } from '@playwright/test';
import { LoginBuilder } from './LoginBuilder';
import { EndPointGlobal } from './EndPointGlobal';
import { ConfigsGlobal } from './ConfigsGlobal';
import { TokenGlobal } from './TokenGlobal';
import { SpecBuilder } from './SpecBuilder';

type MyFixtures = {
    token: string;
    requestSpec: APIRequestContext;
};

export const test = base.extend<MyFixtures>({
    // fixture token
    token: async ({}, use: (token: string) => Promise<void>) => {
        // tạo context **không auth**
        const request = await SpecBuilder.getRequestNotAuthSpec();
        const loginData = LoginBuilder.getDataLogin();

        console.log('Token fixture login URL:', `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_LOGIN}`);
        console.log('Payload:', loginData);

        const response = await request.post(EndPointGlobal.EP_LOGIN, {
            data: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Login status:', response.status());
        console.log('Login body:', await response.text());

        if (response.status() !== 200) {
            throw new Error('Login failed, check URL / payload / server endpoint');
        }

        const body = await response.json();
        TokenGlobal.TOKEN = body.token;
        console.log('Token Global:', TokenGlobal.TOKEN);

        await use(TokenGlobal.TOKEN);
    },

    // fixture requestSpec có auth token
    requestSpec: async ({ token }, use: (requestSpec: APIRequestContext) => Promise<void>) => {
        const requestWithAuth = await SpecBuilder.getRequestSpec();
        await use(requestWithAuth);
    }
});

export { expect };
