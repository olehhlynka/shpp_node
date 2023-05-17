import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { ObjectId } from "bson";
import { Todo, User } from "../types/types";

dotenv.config();

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "";
const saltRounds = 7;

let client: MongoClient;
let db: Db;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

async function getItems(user: string) {
  const db = await connectToDatabase();
  const todos = await db
    .collection("items")
    .find<Todo>(
      { user: user },
      {
        projection: {
          _id: 0,
          text: 1,
          checked: 1,
          id: "$_id",
        },
      }
    )
    .toArray();
  return todos;
}

async function addItem(
  text: string,
  user: string
): Promise<ObjectId> {
  const db = await connectToDatabase();
  const result = await db.collection("items").insertOne({
    user: user,
    text: text,
    checked: false,
  });
  return result?.insertedId;
}

async function editItem(
  user: string,
  id: string,
  text: string,
  checked: boolean
): Promise<boolean> {
  const db = await connectToDatabase();
  const result = await db
    .collection("items")
    .updateOne(
      { _id: new ObjectId(id), user: user },
      { $set: { text: text, checked: checked } }
    );
  return result?.modifiedCount === 1;
}

async function deleteItem(
  id: string,
  user: string
): Promise<boolean> {
  const db = await connectToDatabase();
  const result = await db.collection("items").deleteOne({
    _id: new ObjectId(id),
    user: user,
  });
  return result?.deletedCount === 1;
}

async function loginUser(login: string, pass: string) {
  const db = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne<User>({ login: login });
  if (user && (await bcrypt.compare(pass, user.passHash))) {
    return user.login;
  }
  return null;
}

async function registerUser(login: string, pass: string) {
  const db = await connectToDatabase();
  const existingUser = await db
    .collection("users")
    .findOne<User>({ login: login });
  if (existingUser) {
    return null;
  }
  const passHash = await bcrypt.hash(pass, saltRounds);
  const result = await db
    .collection("users")
    .insertOne({ login: login, passHash: passHash });
  if (result.insertedId) {
    return login;
  }
  return null;
}

export {
  connectToDatabase,
  getItems,
  addItem,
  editItem,
  deleteItem,
  loginUser,
  registerUser,
};
