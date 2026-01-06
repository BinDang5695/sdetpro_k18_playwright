// api/BookService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from './ConfigsGlobal';
import { EndPointGlobal } from './EndPointGlobal';
import { BookBuilder } from './BookBuilder';
import { measureRequest } from './ApiTestHelper';
import { ApiLogger } from './ApiLogger';
import { expect } from '../api/BaseTestApi';

export class BookService {
  static async post(request: APIRequestContext, token: string) {
    const bookData = BookBuilder.getDataToCreateBook();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}`;

    ApiLogger.logRequest('POST', url, { headers: { Authorization: `Bearer ${token}` }, body: bookData });

    const { response, duration } = await measureRequest(() =>
      request.post(url, { headers: { Authorization: `Bearer ${token}` }, data: bookData })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: bookData };
  }

  static async get(request: APIRequestContext, token: string, bookId: number) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;
    ApiLogger.logRequest('GET', url, { headers: { Authorization: `Bearer ${token}` } });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers: { Authorization: `Bearer ${token}` } })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }

  static async put( request: APIRequestContext, token: string, bookId: number) {
    const updateData = BookBuilder.getDataToUpdateBook();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;

    ApiLogger.logRequest('PUT', url, { headers: { Authorization: `Bearer ${token}` },
      body: updateData,
    });

    const { response, duration } = await measureRequest(() =>
      request.put(url, {
        headers: { Authorization: `Bearer ${token}` },
        data: updateData,
      })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: updateData };
  }

static async delete( request: APIRequestContext, token: string, bookId: number ) {
  const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;

  ApiLogger.logRequest('DELETE', url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { response, duration } = await measureRequest(() =>
    request.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  const body = await response.json();
  expect(response.status()).toBe(200);

  await ApiLogger.logResponse(response, duration);
  return { response, body };
}

  static async getAfterDelete(request: APIRequestContext, token: string, bookId: number) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;
    ApiLogger.logRequest('GET', url, { headers: { Authorization: `Bearer ${token}` } });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers: { Authorization: `Bearer ${token}` } })
    );

    const body = await response.json();
    expect(response.status()).toBe(400);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }


}

