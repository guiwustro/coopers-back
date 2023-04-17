import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import bcrypt from "bcrypt";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";

const userCreateService = async ({
	username,
	password,
}: IUserRequest): Promise<IUserRequest> => {
	const userRepository = AppDataSource.getRepository(User);
	const userAlreadyExists = await userRepository.findOneBy({
		username,
	});
	if (userAlreadyExists) {
		throw new AppError("Email already exists");
	}
	const user = new User();

	user.username = username;
	user.password = bcrypt.hashSync(password, 10);

	userRepository.create(user);
	const newUser = await userRepository.save(user);

	return newUser;
};

export default userCreateService;
