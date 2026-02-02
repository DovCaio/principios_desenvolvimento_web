import { Request, Response } from "express";


export const AdminController = {
    async getAdminInfos(req: Request, res: Response) {
        // TODO
        res.status(200).json({ message: "Admin info retrieved successfully" });
    }
};