import validator from 'validator';
import { SignUpRequestBody } from "../../types/request.types";
import { ValidationResult } from "../../types/validation.types";
import User from '../../model/User.model';

const signupValidation = async (signupReqField: SignUpRequestBody):Promise<ValidationResult> => {
  let errorDetails: { field: string; message: string }[] = [];

  if(!signupReqField.name) {
    errorDetails.push({
      field: 'name',
      message: `Name can't be empty`
    });
  }

  if(!signupReqField.email) {
    errorDetails.push({
      field: 'email',
      message: `Email can't be empty`
    });
  } else if(!validator.isEmail(signupReqField.email)) {
    errorDetails.push({
      field: 'email',
      message: `Invalid email format.`
    });
  }

  if(!signupReqField.password) {
    errorDetails.push({
      field: 'password',
      message: `Password can't be empty`
    });
  } else if(!validator.isLength(signupReqField.password, { min: 6 })) {
    errorDetails.push({
      field: 'password',
      message: `Password must be at least 6 characters long`
    });
  }

  const existUser = await User.findOne({email: signupReqField.email});
  if(existUser) {
    errorDetails.push({
      field: 'email',
      message: `User already exist`
    })
  }

  return {
    errorDetails,
    isValid: errorDetails.length === 0
  }
}

export default signupValidation;