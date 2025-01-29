import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/request.types';
import { jwt_token } from '../config/jwt.config';
import { AuthenticationResponse } from '../types/response.types';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const customReq = req as CustomRequest;
  const token = req.headers['authorization']?.replace('Bearer ', '');
  
  if(token) {
    const verificationresult = jwt_token.jwtVerify(token);

    if (verificationresult.statusCode !== 401) {
      customReq.user = {
        id: verificationresult.decoded._id,
        name: verificationresult.decoded.name,
        email: verificationresult.decoded.email,
        role: verificationresult.decoded.role
      }
      next()
    } else {
      const response: AuthenticationResponse = {
        success: false,
        statusCode: verificationresult.statusCode,
        message: 'UnAuthorized! Please log in again.',
        isAuthenticated: false,
      }
      res.json(response);
    }
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Forbidden',
      isAuthenticated: false
    }
    res.json(response);
  }
}

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if(!token) {
    next()
  } else if(token) {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Already loggedin',
      isAuthenticated: true
    }
    res.json(response);
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const request = req as CustomRequest;

  if(request.user?.role === 'admin') {
    next()
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Unauthorized access.',
      errorDetails: 'You must be an admin to perform this action.'
    }
    res.json(response);
  }
}

export const isTrainee = (req: Request, res: Response, next: NextFunction): void => {
  const request = req as CustomRequest;

  if(request.user?.role === 'trainee') {
    next()
  } else {
    const response: AuthenticationResponse = {
      success: false,
      statusCode: 403,
      message: 'Unauthorized access.',
      errorDetails: 'You must be an admin to perform this action.'
    }
    res.json(response);
  }
}