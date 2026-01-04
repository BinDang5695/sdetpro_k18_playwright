import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LogUtils } from '../utils/LogUtils';

export default class ApiKeyword {

  /* ================= GET ================= */

  static async get(
    request: APIRequestContext,
    endpoint: string
  ): Promise<APIResponse> {
    LogUtils.info(`GET: ${endpoint}`);

    const response = await request.get(endpoint);
    await this.logResponse(response);
    return response;
  }

  static async getWithBearer(
    request: APIRequestContext,
    endpoint: string,
    token: string
  ): Promise<APIResponse> {
    LogUtils.info(`GET: ${endpoint}`);
    LogUtils.info(`BEARER TOKEN: ${token}`);

    const response = await request.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    await this.logResponse(response);
    return response;
  }

  static async getWithFileBody(
    request: APIRequestContext,
    endpoint: string,
    file: string
  ): Promise<APIResponse> {
    const body = JSON.parse(fs.readFileSync(file, 'utf-8'));

    LogUtils.info(`GET: ${endpoint}`);
    LogUtils.info(`Body from file: ${file}`);

    const response = await request.get(endpoint, { data: body });
    await this.logResponse(response);
    return response;
  }

  static async getWithKeyFromFile(
    request: APIRequestContext,
    endpoint: string,
    key: string,
    file: string
  ): Promise<APIResponse> {
    const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const body = { [key]: json[key] };

    LogUtils.info(`GET: ${endpoint}`);
    LogUtils.info(`Body: ${JSON.stringify(body)}`);

    const response = await request.get(endpoint, { data: body });
    await this.logResponse(response);
    return response;
  }

  /* ================= POST ================= */

  static async post(
    request: APIRequestContext,
    endpoint: string,
    payload: any
  ): Promise<APIResponse> {
    LogUtils.info(`POST: ${endpoint}`);
    LogUtils.info(`Body: ${JSON.stringify(payload)}`);

    const response = await request.post(endpoint, { data: payload });
    await this.logResponse(response);
    return response;
  }

  static async postFile(
    request: APIRequestContext,
    endpoint: string,
    filePath: string
  ): Promise<APIResponse> {
    LogUtils.info(`POST: ${endpoint}`);
    LogUtils.info(`File: ${filePath}`);

    const response = await request.post(endpoint, {
      multipart: {
        file: fs.createReadStream(filePath)
      }
    });

    await this.logResponse(response);
    return response;
  }

  /* ================= PUT ================= */

  static async put(
    request: APIRequestContext,
    endpoint: string,
    payload: any
  ): Promise<APIResponse> {
    LogUtils.info(`PUT: ${endpoint}`);
    LogUtils.info(`Body: ${JSON.stringify(payload)}`);

    const response = await request.put(endpoint, { data: payload });
    await this.logResponse(response);
    return response;
  }

  /* ================= DELETE ================= */

  static async delete(
    request: APIRequestContext,
    endpoint: string,
    payload?: any
  ): Promise<APIResponse> {
    LogUtils.info(`DELETE: ${endpoint}`);
    if (payload) LogUtils.info(`Body: ${JSON.stringify(payload)}`);

    const response = await request.delete(endpoint, {
      data: payload
    });

    await this.logResponse(response);
    return response;
  }

  /* ================= VERIFY ================= */

  static async verifyStatusCode(
    response: APIResponse,
    expectedStatus: number
  ) {
    LogUtils.info(
      `Verify Status Code: ${response.status()} == ${expectedStatus}`
    );
    expect(response.status()).toBe(expectedStatus);
  }

  static async getResponseValue(
    response: APIResponse,
    key: string
  ): Promise<any> {
    const json = await response.json();
    const value = key.split('.').reduce((o, k) => o[k], json);

    LogUtils.info(`Value by key (${key}): ${value}`);
    return value;
  }

  /* ================= COMMON ================= */

  private static async logResponse(response: APIResponse) {
    const text = await response.text();
    LogUtils.info(`RESPONSE:\n${text}`);
    
  }
}
