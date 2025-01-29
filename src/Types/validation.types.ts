export type ErrorDetails = { field: string; message: string }[];

export interface ValidationResult {
  errorDetails: ErrorDetails | string;
  isValid: boolean;
}