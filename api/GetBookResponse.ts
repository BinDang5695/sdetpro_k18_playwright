import { Image } from './Image';

export interface GetBookResponse {
  message: string;
  response: {
    id: number;
    name: string;
    category_id: number;
    price: number;
    release_date: string;
    status: boolean | number;
    image?: Image[];
  };
}
