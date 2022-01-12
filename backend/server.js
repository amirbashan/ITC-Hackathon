import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION");
});

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the DB"));

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log(`App running in port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION");
  server.close(() => {
    process.exit(1);
  });
});
