import validator from 'validator';
import { LoginRequestBody } from "../../types/request.types";
import { ValidationResult } from "../../types/validation.types";
import User from '../../model/User.model';

const loginValidation = async (loginReqField: LoginRequestBody):Promise<ValidationResult> => {
  let errorDetails: { field: string; message: string }[] = [];

  if(!loginReqField.email) {
    errorDetails.push({
      field: 'email',
      message: `Email can't be empty`
    });
  } else if(!validator.isEmail(loginReqField.email)) {
    errorDetails.push({
      field: 'email',
      message: `Invalid email format.`
    });
  }

  if(!loginReqField.password) {
    errorDetails.push({
      field: 'password',
      message: `Password can't be empty`
    });
  }

  const existUser = await User.findOne({email: loginReqField.email});
  if(!existUser) {
    errorDetails.push({
      field: 'email',
      message: `User not found`
    })
  }

  return {
    errorDetails,
    isValid: errorDetails.length === 0
  }
}

export default loginValidation;