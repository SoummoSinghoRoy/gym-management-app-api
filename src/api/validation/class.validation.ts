import { ClassRequestBodyData, Day } from "../../types/request.types";
import { ErrorDetails, ValidationResult } from "../../types/validation.types";
import Class from "../../model/Class.model";
import Trainer from "../../model/Trainer.model";

class ClassValidation {
  private errorResult: ErrorDetails = [];

  private async classBaseValidation (classReqBody: ClassRequestBodyData): Promise<ErrorDetails> {
    if(!classReqBody.className){
      this.errorResult.push({
        field: 'className',
        message: `Class name can't be empty`
      })
    }

    if(!classReqBody.day){
      this.errorResult.push({
        field: 'day',
        message: `Day can't be empty`
      })
    } else if(!Object.values(Day).includes(classReqBody.day)) {
      this.errorResult.push({
        field: 'day',
        message: `Day must be one of: ${Object.values(Day).join(', ')}`
      });
    }

    if(!classReqBody.time) {
      this.errorResult.push({
        field: 'time',
        message: `Time can't be empty`
      })
    }

    if(!classReqBody.trainer) {
      this.errorResult.push({
        field: 'trainer',
        message: `Trainer can't be empty`
      })
    } else {
      const validTrainer = await Trainer.findById(classReqBody.trainer);

      if(!validTrainer) {
        this.errorResult.push({
          field: 'trainer',
          message: `Trainer must be valid`
        })
      }
    }
    
    return this.errorResult
  }

  async classCreateValidation(createReqBody: ClassRequestBodyData): Promise<ValidationResult> {
    const baseValidationResult = await this.classBaseValidation(createReqBody);

    if(baseValidationResult.length !== 0) {
      this.errorResult = []
      return {
        errorDetails: baseValidationResult,
        isValid: baseValidationResult.length === 0
      }
    } else {
      const existClass = await Class.findOne({className: createReqBody.className});
      if(existClass) {
        this.errorResult.push({
          field: 'className',
          message: `Class already exist`
        })
      }
      return {
        errorDetails: this.errorResult,
        isValid: this.errorResult.length === 0
      }
    }
  }
}

export const classValidation = new ClassValidation();