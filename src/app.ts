import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import path from "path";
import { generalLimiter } from "./middleware/rateLimit.middleware"; // <--- Import novo
import routes from "./routes";
import { auditMiddleware } from "./middleware/audit.middleware";

dotenv.config();

export const app = express();

app.use(express.json());

// Aplica o limite geral em todas as requisições
app.use(generalLimiter);

app.use(auditMiddleware())

app.use(routes);

app.use(express.static(path.join(__dirname, "public")));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("🔥 EXPRESS ERROR:", err);

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    message: err.message || "Internal server error",
  });
};

app.use(errorHandler);

export default app;