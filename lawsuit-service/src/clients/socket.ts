import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: ["http://localhost:8081", "http://localhost:8080"],
  preflightContinue: false,
};

const app = express();

app.use(cors(options));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

export {httpServer, io}
