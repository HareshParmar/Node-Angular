export interface Item {
  id: string;
  itemname: string;
  price: string;
  userId: string;
}

export interface resultSet {
  results: Item[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
