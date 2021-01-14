import { getConnectionOptions, createConnection, Connection } from 'typeorm';

export const createTypeormConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(
    process.env.CONNECTION_NAME,
  );
  return createConnection({ ...connectionOptions, name: 'default' });
};
