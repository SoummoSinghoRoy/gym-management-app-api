import { ObjectId } from "mongoose";

type Role = "admin" | "trainee";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface ITrainee extends IUser {
  user: ObjectId;
  mobileNo: string;
  address: string;
  age: number;
  identityNumber: number;
  height: string;
  weight: string;
}

interface ITrainer {
  name: string;
  email: string;
  mobileNo: string;
  address: string;
}

interface IClass {
  className: string;
  startTime: string;
  endTime: string;
  duration: number;
  trainer: ObjectId;
  trainees: ObjectId[];
}

export { IUser, ITrainee, ITrainer, IClass };