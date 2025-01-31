import { Request, Response } from "express"
import { BasicApiResponse, ClassApiResponse } from "../../types/response.types";
import { classValidation } from "../validation/class.validation";
import Class from "../../model/Class.model";
import Trainer from "../../model/Trainer.model";

export const classCreatePostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { className, day, time, trainer } = req.body;
    const validation = await classValidation.classCreateValidation({ className, day, time, trainer });

    if(!validation.isValid) {
      const validationresult: BasicApiResponse = {
        success: false,
        statusCode: 400,
        message: 'Validation error occurred',
        errorDetails: validation.errorDetails
      }
      res.json(validationresult)
    } else {
      const validTrainer = await Trainer.findById(trainer);
      const addedClass = new Class({
        className, day, time, trainer: validTrainer?._id
      })
      const newClass = await addedClass.save();
      const populatedClass = await Class.findOne({_id: newClass._id})
                                        .populate('trainer', '_id name')
                                        .exec();

      if(!populatedClass) {
        const response: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'Failed to populate class data',
          errorDetails: 'Error occurred'
        }
        res.json(response);
      } else {        
        const response: ClassApiResponse = {
          success: true,
          statusCode: 200,
          message: 'Class successfully created',
          data: {
            _id: populatedClass._id,
            className: populatedClass.className,
            day: populatedClass.day,
            time: populatedClass.time,
            duration: populatedClass.duration,
            trainer: populatedClass.trainer
          }
        }
        res.json(response)
      }
    }
  } catch (error) {
    console.log(error);
    const response: BasicApiResponse = {
      success: false,
      statusCode: 500,
      message: 'Internal server error',
        errorDetails: 'Error occurred, get back soon'
    }
    res.json(response);
  }
}