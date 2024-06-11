import { MongoClient, ServerApiVersion } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME!;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export let client: MongoClient;

if (!MONGODB_URI) { 
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export async function getDb() {
  if (!client) {
    client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
  }
  return client.db(MONGODB_DB_NAME);
}
