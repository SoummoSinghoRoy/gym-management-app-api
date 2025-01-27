import * as jwt from 'jsonwebtoken';
import { env_variables } from './custom_env_variables';
import { JwtResponse } from '../types/response.types';

class JwtToken {
  private secretKey: string;
  private expiresIn: string;

  constructor(secretKey: string, expiresIn: string = '12h') {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  jwtSign(payload: object): JwtResponse {
    const token = jwt.sign(payload, this.secretKey, {expiresIn: this.expiresIn});
    return {
      statusCode: 200,
      message: 'Token generated',
      token
    }
  }

  jwtVerify(jwt_token: string): JwtResponse {
    try {
      const decoded = jwt.verify(jwt_token, this.secretKey);
      return {
        statusCode: 200,
        message: `Decoded token & retrieved user information`,
        decoded
      }
    } catch(err) {
      if(err instanceof jwt.TokenExpiredError) {
        return {
          statusCode: 401,
          message: 'Token has expired. Please log in again.'
        }
      } else {
        console.log(err);
        return {
          statusCode: 500,
          message: 'Server error occurred'
        }
      }
    }
  }
} 

export const jwt_token = new JwtToken(env_variables.secret_key);