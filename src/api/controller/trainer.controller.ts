import { Request, Response } from "express";
import { BasicApiResponse, TrainerApiResponse } from "../../types/response.types";
import { trainerValidation } from "../validation/trainer.validation";
import Trainer from "../../model/Trainer.model";

export const trainerCreatePostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobileNo, address } = req.body;
    const validation = await trainerValidation.trainerCreateValidation({name, email, mobileNo, address});

    if(!validation.isValid) {
      const validationresult: BasicApiResponse = {
        success: false,
        statusCode: 400,
        message: 'Validation error occurred',
        errorDetails: validation.errorDetails
      }
      res.json(validationresult)
    } else {
      const registeredTrainer = new Trainer({ name, email, mobileNo, address })
      const trainer = await registeredTrainer.save();
      const response: TrainerApiResponse = {
        success: true,
        statusCode: 200,
        message: 'Trainer successfully created',
        data: {
          _id: trainer._id,
          name: trainer.name,
          email: trainer.email,
          mobileNo: trainer.mobileNo
        }
      }
      res.json(response)
    }
  } catch (error) {
    console.log(error);
    const response: BasicApiResponse = {
      success: false,
      statusCode: 500,
      message: 'Error occurred, get back soon'
    }
    res.json(response);
  }
}

export const allTrainerGetController = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await Trainer.find();
    if(trainers.length !== 0) {
      const response: TrainerApiResponse = {
        success: true,
        statusCode: 200,
        message: 'Trainer successfully retrieved',
        data: trainers
      }
      res.json(response)
    } else {
      const response: BasicApiResponse = {
        success: false,
        statusCode: 404,
        message: 'Trainers not found'
      }
      res.json(response)
    }
  } catch (error) {
    console.log(error);
    const response: BasicApiResponse = {
      success: false,
      statusCode: 500,
      message: 'Error occurred, get back soon'
    }
    res.json(response);
  }
}














// since use patch method for edit trainer route so must should apply union/or pattern for updating data. like: if need to update trainer email but not need to update name when first check data by trainerId then update time apply request body data or retrieved data. If exist data in request field data will be updated based on request body data other wise kept same data.