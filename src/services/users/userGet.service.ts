import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";

interface IUserGetServiceProps {
	id: number;
}

const userGetService = async ({ id }: IUserGetServiceProps) => {
	const userRepository = AppDataSource.getRepository(User);
	const allUsers = await userRepository.find();

	return allUsers.find((user) => user.id === id);
};

export default userGetService;
