import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

//

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
//

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//
import connectDB from "./db/connect.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//routers
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected");
    //server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
