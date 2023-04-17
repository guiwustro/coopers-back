import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";

const UserLoginService = async ({
	username,
	password,
}: IUserRequest): Promise<string> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ username });
	if (!user) throw new AppError("Wrong e-mail or password.", 403);

	if (!bcrypt.compareSync(password, user.password))
		throw new AppError("Wrong e-mail or password.", 403);

	const token = jwt.sign({}, String(process.env.SECRET_KEY), {
		subject: user.id.toString(),
		expiresIn: "30days",
	});

	return token;
};

export default UserLoginService;
