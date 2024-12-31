import express, { Application } from 'express';
import { dbConnect } from './config/db.config';

const app: Application = express();
const port: number = 8050;

app.listen(port, (): void => {
  console.log(`Server listening on PORT: ${port}`);
  dbConnect().then(() => {
    console.log("Database connected successfully....")
  }).catch((err: Error) => {
    console.error(`Error occurred, Reason- ${err}`);
  })
})

import setMiddleware from './middleware/middlewares';
setMiddleware(app);
import setRoute from './api/routes/routes';
setRoute(app);

