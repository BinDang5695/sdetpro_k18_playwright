// api/SpecBuilder.ts
import { request as playwrightRequest, APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from './ConfigsGlobal';
import { TokenGlobal } from './TokenGlobal';

export class SpecBuilder {
    // request context có token
    static async getRequestSpec(): Promise<APIRequestContext> {
        return await playwrightRequest.newContext({
            baseURL: ConfigsGlobal.BASE_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(TokenGlobal.TOKEN ? { 'Authorization': `Bearer ${TokenGlobal.TOKEN}` } : {})
            }
        });
    }

    // request context không token
    static async getRequestNotAuthSpec(): Promise<APIRequestContext> {
        return await playwrightRequest.newContext({
            baseURL: ConfigsGlobal.BASE_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
}
