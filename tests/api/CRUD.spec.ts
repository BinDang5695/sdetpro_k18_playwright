// tests/api/CRUDBookTest.spec.ts
import { test, expect } from '../../api/BaseTestApi';
import fs from 'fs';
import path from 'path';
import { BookBuilder } from '../../api/BookBuilder';
import { EndPointGlobal } from '../../api/EndPointGlobal';
import VerifyDataBookBody from '../../api/VerifyDataBookBody';

test.describe('CRUD Book API', () => {
  const dataFile = path.join(__dirname, '../../test_data/CreateBook.json');

  test('Test Add New Book', async ({ request, token }) => {
    // Tạo data giống BookPOJO_Lombok_Builder.getDataToCreateBook()
    const book = BookBuilder.getDataToCreateBook();

    // Ghi vào JSON file
    fs.writeFileSync(dataFile, JSON.stringify(book, null, 2));

    // Gửi request POST
    const response = await request.post(EndPointGlobal.EP_BOOK, {
      data: book,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(200);

    // Verify response
    const responseBody = await response.json();
    VerifyDataBookBody.verifyResponseSuccess(responseBody, book, 200);
  });
});
