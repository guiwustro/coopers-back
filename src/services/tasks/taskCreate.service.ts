import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ITaskRequest } from "../../interfaces/tasks";

const taskCreateService = async (newTaskData: ITaskRequest, userId: number) => {
	const taskRepository = AppDataSource.getRepository(Task);
	const userRepository = AppDataSource.getRepository(User);

	const owner = await userRepository.findOneBy({ id: userId });
	if (!owner) throw new AppError("Logged in user doesn't exist");

	const newTask = taskRepository.create(newTaskData);
	newTask.user = owner;
	await taskRepository.save(newTask);
	return newTask;
};

export default taskCreateService;
