import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { BasicApiResponse, UserApiResponse } from "../../types/response.types";
import { userValidation } from "../validation/user.validation";
import User from "../../model/User.model";
import { jwt_token } from "../../config/jwt.config";
import { CustomRequest } from "../../types/request.types";

export const signupPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const validation = await userValidation.signupValidation({name, email, password});
    if(!validation.isValid) {
      const validationresult: BasicApiResponse = {
        success: false,
        statusCode: 400,
        message: 'Validation error occurred',
        errorDetails: validation.errorDetails
      }
      res.json(validationresult)
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if(err) {
          console.log(err);
          const response: BasicApiResponse = {
            success: false,
            statusCode: 500,
            message: 'Error occurred, get back soon',
          }
          res.json(response)
        } else {
          const registeredUser = new User({
            name, email,
            password: hash,
            role: 'admin'
          })
          const user = await registeredUser.save();
          const response: UserApiResponse = {
            success: true,
            statusCode: 200,
            message: 'User successfully created',
            data: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          }
          res.json(response)
        }
      })
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

export const loginPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const validation = await userValidation.loginValidation({email, password});

    if(!validation.isValid) {
      const validationresult: BasicApiResponse = {
        success: false,
        statusCode: 400,
        message: 'Validation error occurred',
        errorDetails: validation.errorDetails
      }
      res.json(validationresult)
    } else {
      const validUser = await User.findOne({email});
      if(validUser) {
        const match = await bcrypt.compare(password, validUser.password);
        if(match) {
          const jwtResult = jwt_token.jwtSign({_id: validUser._id, name: validUser.name, email: validUser.email, role: validUser.role});
          if(jwtResult.statusCode === 200) {
            const response: UserApiResponse = {
              success: true,
              statusCode: jwtResult.statusCode,
              message: `Successfully loggedin`,
              token: 'Bearer ' + jwtResult.token,
              isAuthenticated: true
            }
            res.json(response);
          } else {
            const response: UserApiResponse = {
              success: false,
              statusCode: jwtResult.statusCode,
              message: jwtResult.message,
              isAuthenticated: false
            }
            res.json(response);
          }
        } else {
          const validationresult: BasicApiResponse = {
            success: false,
            statusCode: 401,
            message: 'Incorrect password',
          }
          res.json(validationresult)
        }
      } else {
        const validationresult: BasicApiResponse = {
          success: false,
          statusCode: 404,
          message: 'User not found',
        }
        res.json(validationresult)
      }
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

export const logoutPostController = (req: Request, res: Response) => {
  const request = req as CustomRequest;
  try {
    request.user = null;
    const response: UserApiResponse = {
      success: true,
      statusCode: 200,
      message: 'Successfully loggedout',
      isAuthenticated: false
    }
    res.json(response)
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
