import validator from 'validator';
import { LoginRequestBody, SignUpRequestBody } from "../../types/request.types";
import { ValidationResult } from "../../types/validation.types";
import User from '../../model/User.model';

class UserValidation {
  private errorDetails: { field: string; message: string }[] = [];

  async signupValidation (signupReqField: SignUpRequestBody): Promise<ValidationResult> {
    if(!signupReqField.name) {
      this.errorDetails.push({
        field: 'name',
        message: `Name can't be empty`
      });
    }
  
    if(!signupReqField.email) {
      this.errorDetails.push({
        field: 'email',
        message: `Email can't be empty`
      });
    } else if(!validator.isEmail(signupReqField.email)) {
      this.errorDetails.push({
        field: 'email',
        message: `Invalid email format.`
      });
    }
  
    if(!signupReqField.password) {
      this.errorDetails.push({
        field: 'password',
        message: `Password can't be empty`
      });
    } else if(!validator.isLength(signupReqField.password, { min: 6 })) {
      this.errorDetails.push({
        field: 'password',
        message: `Password must be at least 6 characters long`
      });
    }
  
    const existUser = await User.findOne({email: signupReqField.email});
    if(existUser) {
      this.errorDetails.push({
        field: 'email',
        message: `User already exist`
      })
    }
  
    return {
      errorDetails: this.errorDetails,
      isValid: this.errorDetails.length === 0
    }
  }

  async loginValidation(loginReqField: LoginRequestBody):Promise<ValidationResult> {
    if(!loginReqField.email) {
      this.errorDetails.push({
        field: 'email',
        message: `Email can't be empty`
      });
    } else if(!validator.isEmail(loginReqField.email)) {
      this.errorDetails.push({
        field: 'email',
        message: `Invalid email format.`
      });
    }
  
    if(!loginReqField.password) {
      this.errorDetails.push({
        field: 'password',
        message: `Password can't be empty`
      });
    }
  
    const existUser = await User.findOne({email: loginReqField.email});
    if(!existUser) {
      this.errorDetails.push({
        field: 'email',
        message: `User not found`
      })
    }
  
    return {
      errorDetails: this.errorDetails,
      isValid: this.errorDetails.length === 0
    }
  }
}

export const userValidation = new UserValidation();