import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Interface que estende o Request do Express
 * permitindo acessar req.user.userId e req.user.email
 */
export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

/**
 * Middleware responsável por validar o token JWT
 * e anexar as informações do usuário ao req.user
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // Bearer XXXXX

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as {
      userId: number;
      email: string;
    };

    // Adiciona info do usuário no request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
