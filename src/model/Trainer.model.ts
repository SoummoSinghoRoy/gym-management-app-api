import { Schema, model } from "mongoose";
import { ITrainer } from "../types/model.types";

const trainerSchema = new Schema<ITrainer>({
  name: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  mobileNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
},{
  timestamps: true
})

const Trainer = model<ITrainer>('Trainer', trainerSchema);

export default Trainer;