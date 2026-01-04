import { request, APIRequestContext } from '@playwright/test';

export async function createApiContext(
  token?: string
): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}
