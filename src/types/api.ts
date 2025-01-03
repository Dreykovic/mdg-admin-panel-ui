export type PaginationData<T> = {
  data: T;
  total: number; // Nombre total d'éléments
  page: number; // Page actuelle
  pageSize: number; // Nombre d'éléments par page
};

export type ListData<T> = {
  [key: string]: T;
};
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  content: T;
}

export interface PaginationResponse<T> {
  success: boolean;
  message: string;
  status: number;
  content: PaginationData<T>;
}
export interface ListResponse<T> {
  success: boolean;
  message: string;
  status: number;
  content: ListData<T>;
}
