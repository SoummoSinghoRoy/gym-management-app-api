export interface UserApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errorDetails?: { field: string; message: string;}[];
  data?: {
    id: any;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
  isAuthenticated?: boolean;
}

export interface JwtResponse {
  statusCode: number;
  message: string;
  token?: string;
  decoded?: any;
}

export interface AuthenticationResponse extends Partial<UserApiResponse> {}