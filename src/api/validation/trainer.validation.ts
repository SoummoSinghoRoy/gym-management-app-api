import validator from "validator";
import { TrainerCreateRequestBoy } from "../../types/request.types";
import { ValidationResult } from "../../types/validation.types";
import Trainer from "../../model/Trainer.model";

class TrainerValidation {
  errorDetails: { field: string; message: string }[] = [];

  async trainerCreateValidation(createReqBody: TrainerCreateRequestBoy): Promise<ValidationResult> {

    if(!createReqBody.name) {
      this.errorDetails.push({
        field: 'name',
        message: `Name can't be empty`
      });
    }
    
    if(!createReqBody.email) {
      this.errorDetails.push({
        field: 'email',
        message: `Email can't be empty`
      });
    } else if(!validator.isEmail(createReqBody.email)) {
      this.errorDetails.push({
        field: 'email',
        message: `Invalid email format.`
      });
    }

    if(!createReqBody.mobileNo) {
      this.errorDetails.push({
        field: 'mobileNo',
        message: `Mobile no can't be empty`
      });
    }

    if(!createReqBody.address) {
      this.errorDetails.push({
        field: 'address',
        message: `Address can't be empty`
      });
    }

    const existTrainer = await Trainer.findOne({email: createReqBody.email});

    if(existTrainer) {
      this.errorDetails.push({
        field: 'email',
        message: `Trainer already exist`
      })
    }

    return {
      errorDetails: this.errorDetails,
      isValid: this.errorDetails.length === 0
    }
  }

  trainerEditValidation() {}
}

export const trainerValidation = new TrainerValidation();