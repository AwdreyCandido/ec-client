export interface ValidationErrorResponse {
  message: string | string[];
  statusCode: number;
  error?: string;
}
