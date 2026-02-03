import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const AuthService = {
    async login(cpf: string, passwordPlain: string) {
        const user = await prisma.user.findUnique({
            where: { cpf }
        });

        if (!user) {
            throw new Error("CPF ou senha inválidos");
        }

        const isPasswordValid = await compare(passwordPlain, user.password);

        if (!isPasswordValid) {
            throw new Error("CPF ou senha inválidos");
        }

        const secret = process.env.JWT_SECRET || "segredo_padrao_dev";
        
        const token = jwt.sign(
            { 
                cpf: user.cpf, 
                userType: user.userType,
                name: user.name
            }, 
            secret, 
            { expiresIn: "1d" }
        );

        return { 
            token, 
            user: { 
                name: user.name, 
                cpf: user.cpf, 
                type: user.userType 
            } 
        };
    }
}