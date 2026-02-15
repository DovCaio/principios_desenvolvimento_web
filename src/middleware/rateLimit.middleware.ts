import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    trustProxy: false 
  }
});

// Limiter específico para login/auth
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // Limite de 5 tentativas
  message: {
    status: 429,
    message: "Muitas tentativas de login, por favor tente novamente mais tarde."
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    trustProxy: false
  }
});