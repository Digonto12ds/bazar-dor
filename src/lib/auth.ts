import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error(
    "MONGODB_URL is missing. Please check your environment variables."
  );
}

const client = new MongoClient(mongodbUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
