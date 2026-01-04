// api/Book.ts
export interface Book {
  id?: number;
  name: string;
  category_id: number;
  price: number;
  release_date: string;
  status: boolean;
  image_ids: number[];
}
