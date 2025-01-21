import { Request } from "express";

export interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequestBody extends Partial<SignUpRequestBody> {}

export interface CustomRequest extends Request {
  user: {
    id: string,
    name: string,
    email: string,
    role: string
  } | null
}

export interface TrainerCreateRequestBoy {
  name: string;
  email: string;
  mobileNo: string;
  address: string;
}