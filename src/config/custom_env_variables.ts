import dotenv from 'dotenv';
dotenv.config()

import { EnvVariables } from '../types/env_variables.types';

const env_variables: EnvVariables = {
  db_admin: process.env.DB_ADMIN || '',
  db_password: process.env.DB_PASSWORD || '',
  secret_key: process.env.SECRET_KEY || 'Secret-Key-001'
}

export { env_variables };