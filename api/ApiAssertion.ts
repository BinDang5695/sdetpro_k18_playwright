import { expect, APIResponse } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

export default class ApiAssertion {

  // ✅ Verify status code
  static verifyStatusCode(response: APIResponse, expectedStatusCode: number) {
    expect(response.status()).toBe(expectedStatusCode);
  }

  // ✅ Verify message
  static async verifyMessage(response: APIResponse, expectedMessage: string) {
    const body = await response.json();
    expect(body.message).toBe(expectedMessage);
  }

  // ✅ Verify response time (ms)
static verifyResponseTime(
  startTime: number,
  endTime: number,
  maxTimeMs: number = 2000
) {
  const totalTime = endTime - startTime;
  expect(totalTime).toBeLessThanOrEqual(maxTimeMs);
}



  // ✅ Verify header
  static verifyHeader(
    response: APIResponse,
    headerName: string,
    expectedValue: string
  ) {
    const headers = response.headers();
    const actual = headers[headerName.toLowerCase()];
    expect(actual).toBe(expectedValue);
  }

  // ✅ Verify JSON schema
  static async verifySchema(
    response: APIResponse,
    schemaFilePath: string
  ) {
    const schemaPath = path.resolve(schemaFilePath);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

    const body = await response.json();

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const valid = validate(body);

    if (!valid) {
      throw new Error(
        `Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`
      );
    }
  }

  // ✅ Verify base response
static async verifyBaseResponse(
  response: APIResponse,
  statusCode: number,
  responseTimeMs: number,
  maxTimeMs: number = 2000
) {
  this.verifyStatusCode(response, statusCode);
  this.verifyResponseTime(responseTimeMs, maxTimeMs);
}
}
