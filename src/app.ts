import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { HttpError } from "http-errors";
import http from 'http';
import { errorUtilities } from "./utilities";
import database from "./configurations/database";
import config from "./configurations/config";
// import './models/associations';

errorUtilities.processErrorHandler()

const app = express();

dotenv.config()

// Security HTTP headers to disable 'powered by Express' header feature
app.disable("x-powered-by");

// Security HTTP headers
app.use(helmet());

//Other Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Database
database
  .sync({})
  .then(() => {
    console.log(`${config.stage} database is connected`);
  })
  .catch((err: HttpError) => {
    console.log("No connection:", err);
  });


// Routes
// app.use("/api/v1", apiRouter);


// Health Check Endpoint
app.get("/", (request: Request, response: Response) => {
  response.send("Welcome to Readers-Delight's Backend Server. 👋");
});


// Error handler
app.use(errorUtilities.globalErrorHandler);

//Server

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`server running on Port ${config.PORT}`);
});

export default app;
