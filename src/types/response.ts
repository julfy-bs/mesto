export type CustomResponse<T> = {
  success: boolean;
  data?: T;
  error?: T;
} & Response;
