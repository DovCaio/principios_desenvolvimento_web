import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { CredentialInvalidException } from "../exceptions/CredentialInvalidException";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";

const prisma = new PrismaClient();

export const AuthService = {
    async login(cpf: string, passwordPlain: string) {
        const user = await prisma.user.findUnique({
            where: { cpf }
        });

        if (!user) {
            throw new CredentialInvalidException();
        }

        const isPasswordValid = await comparePassword(passwordPlain, user.password);

        if (!isPasswordValid) {
            throw new CredentialInvalidException();
        }

        const token = generateToken(user.cpf, user.name, user.userType);

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