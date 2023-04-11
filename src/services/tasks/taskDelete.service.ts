import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { AppError } from "../../errors/appError";

const taskDeleteService = async (taskId: number, userId: number) => {
	const taskRepository = AppDataSource.getRepository(Task);

	const task = await taskRepository.findOne({
		where: {
			id: taskId,
		},
		relations: { user: true },
	});
	if (!task) throw new AppError("Task not found");
	const isOwner = task.user.id === userId;
	if (!isOwner) throw new AppError("The user doesn't have permissions.", 403);
	await taskRepository.delete(taskId);
};

export default taskDeleteService;
