import express from "express";
import routes from "./routes";
import path from "path";
import { ErrorRequestHandler } from "express";
export const app = express();
import dotenv from "dotenv";

dotenv.config();

// todas as rotas são registradas em /routes/index.ts
app.use(express.json());
app.use(routes);

// arquivos estáticos (se quiser)
app.use(express.static(path.join(__dirname, "public")));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //console.error("🔥 EXPRESS ERROR:", err); serve para depurar

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    message: err.message || "Internal server error",
  });
};

app.use(errorHandler);

export default app;
