import { MongoClient } from 'mongodb';

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER_ADDRESS,
  MONGODB_DB_NAME,
} = process.env;

if (!MONGODB_USERNAME || !MONGODB_PASSWORD) {
  throw new Error("Variáveis do MongoDB não definidas");
}

const encodedPassword = encodeURIComponent(MONGODB_PASSWORD);

const uri = `mongodb+srv://${MONGODB_USERNAME}:${encodedPassword}@${MONGODB_CLUSTER_ADDRESS}/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;

export const client = new MongoClient(uri);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
}

const database = client.db(dbName);

export default database;
