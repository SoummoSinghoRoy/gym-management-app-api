import { Schema, model } from "mongoose";
import { ITrainee } from "../Types/model.types";

const traineeSchema = new Schema<ITrainee> ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  mobileNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  identityNumber: {
    type: Number,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Trainee = model<ITrainee>('Trainee', traineeSchema);

export default Trainee;