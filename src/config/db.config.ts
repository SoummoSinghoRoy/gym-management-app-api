import { connect } from 'mongoose';
import { env_variables } from "./custom_env_variables";

const db_uri: string = `mongodb+srv://${env_variables.db_admin}:${env_variables.db_password}@cluster-1.ymu6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1`;

async function dbConnect(): Promise<true> {
  await connect(db_uri);
  return true;
}

export { dbConnect };

