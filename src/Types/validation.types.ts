export interface ValidationResult {
  errorDetails: {
    field: string;
    message: string;
  }[];
  isValid: boolean;
}