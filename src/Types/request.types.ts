import { Request } from "express";
import { ObjectId } from "mongoose";

export interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequestBody extends Partial<SignUpRequestBody> {}

export interface CustomRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null
}

export interface TrainerRequestBodyData {
  name: string;
  email: string;
  mobileNo: string;
  address: string;
}

export enum Day {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday"
}

export interface ClassRequestBodyData {
  className: string;
  day: Day;
  time: string;
  trainer: ObjectId;
}