import { expect, APIResponse } from '@playwright/test';
import { Book } from './Book';
import { ImageResponse } from './ImageResponse';
import { LogUtils } from '../utils/LogUtils';
import ApiAssertion from './ApiAssertion';

export default class VerifyDataBookBody {

  static async verifyDataBodyBook(response: APIResponse, book: Book) {
    const body = await response.json();

    const actualId = body.response.id;
    book.id = actualId;

    expect(actualId).toBeGreaterThan(0);

    expect(body.message).toBe('Success');
    expect(body.response.name).toBe(book.name);
    expect(body.response.category_id).toBe(book.category_id);
    expect(body.response.price).toBe(book.price);
    expect(body.response.release_date).toBe(book.release_date);

    // status có thể là boolean | number
    const statusObj = body.response.status;
    let actualStatus: boolean;

    if (typeof statusObj === 'boolean') {
      actualStatus = statusObj;
    } else if (typeof statusObj === 'number') {
      actualStatus = statusObj === 1;
    } else {
      throw new Error(`Unexpected status type: ${typeof statusObj}`);
    }

    expect(actualStatus).toBe(book.status);

    const responseImages: ImageResponse[] = body.response.image;
    const requestImageIds = book.image_ids;

    expect(responseImages).not.toBeNull();
    expect(responseImages.length).toBe(requestImageIds.length);

    for (let i = 0; i < requestImageIds.length; i++) {
      const img = responseImages[i];
      const requestId = requestImageIds[i];

      expect(img.id).toBe(requestId);
      expect(img.path).not.toBeNull();
      expect(img.path).toContain('public/images/');

      LogUtils.info(`message: ${body.message}`);
      LogUtils.info(`name: ${body.response.name}`);
      LogUtils.info(`category_id: ${body.response.category_id}`);
      LogUtils.info(`price: ${body.response.price}`);
      LogUtils.info(`release_date: ${body.response.release_date}`);
      LogUtils.info(`status: ${body.response.status}`);
      LogUtils.info(`id: ${body.response.id}`);
      LogUtils.info(`image.id: ${img.id}`);
      LogUtils.info(`image.path: ${img.path}`);
    }
  }

  // ================= HEADERS =================

  static verifyAllHeaders(response: APIResponse) {
    const headers = response.headers();

    expect(headers['connection']).toBe('Keep-Alive');
    expect(headers['keep-alive']).toBeTruthy();
    expect(headers['cache-control']).toBe('no-cache, private');
    expect(headers['content-type']).toContain('application/json');
    expect(headers['x-ratelimit-limit']).toBe('60');
    expect(headers['x-ratelimit-remaining']).toBeTruthy();
    expect(headers['access-control-allow-origin']).toBe('*');
    expect(headers['vary']).toBe('Accept-Encoding');

    const contentLength = Number(headers['content-length']);
    expect(contentLength).toBeGreaterThan(0);

    expect(headers['content-encoding']).toBe('gzip');
    expect(headers['date']).toBeTruthy();
    expect(headers['server']).toBe('LiteSpeed');
  }

  // ================= RESPONSE SUCCESS =================

  static async verifyResponseSuccess(
    response: APIResponse,
    book: Book,
    statusCode: number
  ) {
    await ApiAssertion.verifyBaseResponse(response, statusCode, 2000);
    await ApiAssertion.verifySchema(
      response,
      'testdata/GetBookSchema.json'
    );

    await this.verifyDataBodyBook(response, book);
    this.verifyAllHeaders(response);
  }

  // ================= AFTER DELETE =================

  static async verifyDataBodyBookAfterDelete(response: APIResponse, book: Book) {
    const body = await response.json();

    const actualId = body.response.id;
    book.id = actualId;

    expect(actualId).toBeGreaterThan(0);

    expect(body.message).toBe('Success');
    expect(body.response.name).toBe(book.name);
    expect(body.response.category_id).toBe(book.category_id);
    expect(body.response.price).toBe(book.price);
    expect(body.response.release_date).toBe(book.release_date);

    const statusObj = body.response.status;
    const actualStatus =
      typeof statusObj === 'boolean'
        ? statusObj
        : statusObj === 1;

    expect(actualStatus).toBe(book.status);

    LogUtils.info(`message: ${body.message}`);
    LogUtils.info(`name: ${body.response.name}`);
    LogUtils.info(`category_id: ${body.response.category_id}`);
    LogUtils.info(`price: ${body.response.price}`);
    LogUtils.info(`release_date: ${body.response.release_date}`);
    LogUtils.info(`status: ${body.response.status}`);
    LogUtils.info(`id: ${body.response.id}`);
  }

  static async verifyResponseSuccessAfterDelete(
    response: APIResponse,
    book: Book,
    statusCode: number
  ) {
    await ApiAssertion.verifyBaseResponse(response, statusCode, 2000);
    await ApiAssertion.verifySchema(
      response,
      'src/test/resources/testdata/GetBookSchema.json'
    );

    await this.verifyDataBodyBookAfterDelete(response, book);
    this.verifyAllHeaders(response);
  }

  // ================= FAIL =================

  static async verifyResponseFail(
    response: APIResponse,
    book: Book,
    statusCode: number
  ) {
    await ApiAssertion.verifyBaseResponse(response, statusCode, 2000);
    await ApiAssertion.verifySchema(
      response,
      'src/test/resources/testdata/GetUserSchemaAfterDelete.json'
    );

    await this.verifyDataBodyBook(response, book);
    this.verifyAllHeaders(response);
  }
}
