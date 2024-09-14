export class PageInfo {
  total: number;

  perPage: number;

  currentPage: number;

  lastPage: number;

  hasNextPage: boolean;

  constructor(params: Partial<PageInfo>) {
    Object.assign(this, { ...params });
  }
}
