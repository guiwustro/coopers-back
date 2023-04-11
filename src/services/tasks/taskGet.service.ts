import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";

const taskGetService = async (userId: number) => {
	const taskRepository = AppDataSource.getRepository(Task);
	const tasks = await taskRepository.find({
		where: {
			user: {
				id: userId,
			},
		},
	});

	return tasks;
};

export default taskGetService;
