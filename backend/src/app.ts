import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import AppError from './errors/AppError';

import routes from './routes';

import { createTypeormConnection } from './database';

const App = async (): Promise<void> => {
  await createTypeormConnection();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      console.error(err);

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

  const port = process.env.PORT || 3333;

  app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}!`);
  });
};

App();
