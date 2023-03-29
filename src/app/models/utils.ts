export interface IPagedReq<T> {
  results: T[];
  count: number;
  next: string;
  previous: string;
}
