import { Schema, model } from "mongoose";
import { IClass } from "../types/model.types";

const classSchema = new Schema<IClass>({
  className: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '2h'
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'Trainer',
    index: true
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