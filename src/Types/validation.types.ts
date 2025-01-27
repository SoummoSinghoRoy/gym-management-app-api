export type ErrorDetails = { field: string; message: string }[];

export interface ValidationResult {
  errorDetails: ErrorDetails;
  isValid: boolean;
}