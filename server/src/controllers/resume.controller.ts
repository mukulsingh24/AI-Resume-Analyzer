import { Request, Response } from "express";
export const uploadResume = (req: Request,res: Response) => {
  res.json({
    success: true,
    message: "Resume Upload Endpoint Working",
  });
};