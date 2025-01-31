import { ErrorDetails } from "./validation.types";

export interface BasicApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errorDetails?: ErrorDetails | string;
}

export interface UserApiResponse extends Partial<BasicApiResponse>{
  data?: {
    _id: any;
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

interface TrainerData {
  _id: any;
  name: string;
  email: string;
  mobileNo: string;
  address?: string;
}

export interface TrainerApiResponse extends Partial<BasicApiResponse>{
  data?: TrainerData | TrainerData[]
}

interface ClassData {
  _id: any;
  className: string;
  day: string;
  time: string;
  duration: string;
  trainer: object;
}

export interface ClassApiResponse extends Partial<BasicApiResponse> {
  data?: ClassData | ClassData[]
}