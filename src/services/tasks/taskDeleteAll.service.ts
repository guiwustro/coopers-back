import AppDataSource from "../../data-source";
import { Task } from "../../entities/task.entity";
import { AppError } from "../../errors/appError";

const taskDeleteAllService = async (
	userId: number,
	tasksToDelete: "done" | "progress"
) => {
	const taskRepository = AppDataSource.getRepository(Task);

	await taskRepository.delete({
		status: tasksToDelete,
		user: {
			id: userId,
		},
	});
};

export default taskDeleteAllService;
