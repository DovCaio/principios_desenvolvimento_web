import express from "express";
import routes from "./routes";
import path from "path";
export const app = express();


// todas as rotas são registradas em /routes/index.ts
app.use(express.json());
app.use(routes);

// arquivos estáticos (se quiser)
app.use(express.static(path.join(__dirname, "public")));

export default app