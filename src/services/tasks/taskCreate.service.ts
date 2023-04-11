import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ITaskRequest } from "../../interfaces/tasks";

const taskCreateService = async (newTaskData: ITaskRequest, userId: number) => {
	const taskRepository = AppDataSource.getRepository(Task);
	const userRepository = AppDataSource.getRepository(User);
	// const owner = await userRepository.findOneBy({ id: userId });
	const owner = await userRepository.findOne({
		where: { id: userId },
		relations: {
			tasks: true,
		},
	});

	if (!owner) throw new AppError("Logged in user doesn't exist");

	const orderedTasksByIndex = owner.tasks.sort(
		(a, b) => a.index_number - b.index_number
	);
	let lastIndex = 0;
	if (orderedTasksByIndex.length > 0) {
		lastIndex =
			orderedTasksByIndex[orderedTasksByIndex.length - 1].index_number;
	}

	const newTask = taskRepository.create(newTaskData);
	newTask.index_number = lastIndex + 1024;
	newTask.user = owner;
	const taskSaved = await taskRepository.save(newTask);
	return taskSaved;
};

export default taskCreateService;
