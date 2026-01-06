export interface BookCreateRequest {
  name: string;
  category_id: number;
  price: number;
  release_date: string; // yyyy/MM/dd
  image_ids: number[];
  status: boolean;
}
