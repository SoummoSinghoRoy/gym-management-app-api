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
  classes: ObjectId[];
}

interface ITrainer {
  name: string;
  email: string;
  mobileNo: string;
  address: string;
}

type DaysofWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

interface IClass {
  className: string;
  day: DaysofWeek;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  trainer: ObjectId;
  trainees: ObjectId[];
}

export { IUser, ITrainee, ITrainer, IClass };