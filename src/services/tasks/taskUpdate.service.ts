import AppDataSource from "../../data-source";
import { Task, TaskStatus } from "../../entities/task.entity";
import { AppError } from "../../errors/appError";

const taskUpdateService = async (
	newTaskData: {
		id: number;
		status?: TaskStatus;
		name?: string;
	},
	userId: number
) => {
	const taskRepository = AppDataSource.getRepository(Task);
	const task = await taskRepository.findOne({
		where: { id: newTaskData.id },
		relations: ["user"],
	});
	const isOwner = task?.user.id === userId;
	if (!isOwner) throw new AppError("You don't have permission", 403);
	const updatedTask = { ...task, ...newTaskData };
	await taskRepository.save(updatedTask);
	return updatedTask;
};

export default taskUpdateService;
