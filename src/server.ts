import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import { errorMiddleware } from './middlewares/responseAPI.middleware';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DB_STRING = process.env.DB_STRING || '';

// body parser
app.use(express.json({ limit: "50mb", type: ["application/json", "text/plain"]}));
app.use(express.urlencoded( { extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome...")
});

// routes
app.use("/api", routes);
app.all("*", (req, res) => {
  res.status(404).send("404 page not found...");
});

// global error handler
app.use(errorMiddleware);

// database connection
mongoose.connect(DB_STRING);
mongoose.connection.on("error", () => {
  console.log("There was an issue into connecting to database.");
});
mongoose.connection.once("open", () => {
  console.log("Database connected successfully.");

  app.listen(PORT, () => {
    console.log("Server started on port number 3000.");
  });
});