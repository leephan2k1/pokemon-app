export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface ApiListResponse<T> {
  pageInfo: PageInfo;
  data: T[];
}
