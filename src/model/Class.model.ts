import { Schema, model } from "mongoose";
import { IClass } from "../Types/model.types";

const classSchema = new Schema<IClass>({
  className: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'Trainer'
  },
  trainees: [{
    type: Schema.Types.ObjectId,
    ref: 'Trainee'
  }]
}, {
  timestamps: true
})

const Class = model<IClass>('Class', classSchema);

export default Class;