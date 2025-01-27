import validator from "validator";
import { TrainerRequestBodyData } from "../../types/request.types";
import { ErrorDetails, ValidationResult } from "../../types/validation.types";
import Trainer from "../../model/Trainer.model";

class TrainerValidation {
  private errorResult: ErrorDetails = [];

  private trainerBaseValidation(trainerReqBody: TrainerRequestBodyData): ErrorDetails {

    if(!trainerReqBody.name) {
      this.errorResult.push({
        field: 'name',
        message: `Name can't be empty`
      });
    }
    
    if(!trainerReqBody.email) {
      this.errorResult.push({
        field: 'email',
        message: `Email can't be empty`
      });
    } else if(!validator.isEmail(trainerReqBody.email)) {
      this.errorResult.push({
        field: 'email',
        message: `Invalid email format.`
      });
    }

    if(!trainerReqBody.mobileNo) {
      this.errorResult.push({
        field: 'mobileNo',
        message: `Mobile no can't be empty`
      });
    }

    if(!trainerReqBody.address) {
      this.errorResult.push({
        field: 'address',
        message: `Address can't be empty`
      });
    }

    return this.errorResult
  }

  async trainerCreateValidation(createReqBody: TrainerRequestBodyData): Promise<ValidationResult> {
    const baseValidationResult = this.trainerBaseValidation(createReqBody);

    if(baseValidationResult.length !== 0) {
      this.errorResult = []
      return {
        errorDetails: baseValidationResult,
        isValid: baseValidationResult.length === 0
      }
    } else {
      const existTrainer = await Trainer.findOne({email: createReqBody.email});
      if(existTrainer) {
        this.errorResult.push({
          field: 'email',
          message: `Trainer already exist`
        })
      }
      return {
        errorDetails: this.errorResult,
        isValid: this.errorResult.length === 0
      }
    }
  }

  async trainerEditValidation(updateReqBody: TrainerRequestBodyData): Promise<ValidationResult> {
    const baseValidationResult = this.trainerBaseValidation(updateReqBody);
    this.errorResult = []
    return {
      errorDetails: baseValidationResult.length !== 0 ? baseValidationResult : [],
      isValid: baseValidationResult.length === 0
    }
  }
}

export const trainerValidation = new TrainerValidation();

// modify jwt_config error handling response & update isAuthenticated middleware.
// update trainer validation approach and done trainer edit validation.
// update user validation approach.  