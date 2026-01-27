import express from "express";
import routes from "./routes";
import path from "path";
import { ErrorRequestHandler } from "express";
export const app = express();
import dotenv from 'dotenv';

dotenv.config();


// todas as rotas são registradas em /routes/index.ts
app.use(express.json());
app.use(routes);

// arquivos estáticos (se quiser)
app.use(express.static(path.join(__dirname, "public")));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("🔥 EXPRESS ERROR:", err);

    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
};

app.use(errorHandler);

export default app;