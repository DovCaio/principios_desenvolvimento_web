import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Muitas requisições vindas deste IP. Tente novamente em 15 minutos."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "Muitas tentativas de login incorretas. Tente novamente em 1 hora."
  },
  standardHeaders: true,
  legacyHeaders: false,
});