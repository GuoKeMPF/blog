export type Text = {
  author: string;
  id: string;
  content: string;
  title: string;
  description: string;
};

export interface PageResponseParams<T = {}> extends T {
  size?: string | number;
  page?: string | number;
}

export type PageResponse<T> = {
  count: number;
  page: number;
  size: number;
  data: T[];
};
