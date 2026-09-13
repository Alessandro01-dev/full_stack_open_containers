const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const connectToDatabase = require("./db");
const startServer = require("./server");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

const main = async () => {
  await connectToDatabase(MONGODB_URI);
  await startServer(PORT);
};

main();
