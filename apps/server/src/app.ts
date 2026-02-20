import express from "express";
import router from "./routes/global.route.js";
import cors from "cors"

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

export default app;
