import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userGetService from "../../services/users/userGet.service";

const UserGetController = async (req: Request, res: Response) => {
	const { id } = req.user;
	const userData = await userGetService({ id });
	return res.status(200).json(instanceToPlain(userData));
};

export default UserGetController;
