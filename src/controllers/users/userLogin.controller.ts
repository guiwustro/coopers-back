import { Request, Response } from "express";
import UserLoginService from "../../services/users/userLogin.service";

const UserLoginController = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const token = await UserLoginService({ username, password });
	return res.status(200).json({ token });
};

export default UserLoginController;
