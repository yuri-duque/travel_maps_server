import mongoose from "mongoose";
import CustomError from "../../utils/customError";

export async function connect() {
  try {
    const connection = handleConnection();

    mongoose.set("bufferCommands", true);

    await mongoose.connect(connection);

    return mongoose;
  } catch (error) {
    console.error(error);
    throw new CustomError("Error connecting to database");
  }
}

function handleConnection() {
  const url = process.env.MONGO_URL;
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;

  if (!url || !username || !password) throw new CustomError("Missing environment variables");

  let connection = url;
  connection = connection.replace("<username>", username);
  connection = connection.replace("<password>", password);

  return connection;
}
