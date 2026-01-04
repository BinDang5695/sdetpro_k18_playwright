import { faker } from '@faker-js/faker';
import { Book } from './Book';
//import { fakerEN as faker } from '@faker-js/faker';

export class BookBuilder {
  static getDataToCreateBook(): Book {
    return {
      name: faker.book.title(),
      category_id: 139,
      price: faker.number.int({ min: 1, max: 9999 }),
      release_date: faker.date
        .birthdate({ min: 18, max: 80, mode: 'age' })
        .toISOString()
        .split('T')[0], // yyyy-MM-dd
      status: true,
      image_ids: [76]
    };
  }

  static createUpdatedBook(request: Book): Book {
    return {
      id: request.id,
      name: faker.book.title(),
      category_id: request.category_id,
      price: request.price,
      release_date: request.release_date,
      status: false,
      image_ids: [61]
    };
  }
}
