import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
	const { email, password } = req.newUser;
	const newUser = await userCreateService({
		email,
		password,
	});
	return res.status(201).json(instanceToPlain(newUser));
};

export default userCreateController;
