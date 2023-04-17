import AppDataSource from "../../data-source";
import { Task, TaskStatus } from "../../entities/task.entity";
import { AppError } from "../../errors/appError";

const taskUpdateService = async (
	newTaskData: {
		id: number;
		status?: TaskStatus;
		name?: string;
		index_number?: number;
	},
	userId: number
) => {
	const taskRepository = AppDataSource.getRepository(Task);
	const task = await taskRepository.findOne({
		where: { id: newTaskData.id },
		relations: {
			user: {
				tasks: true,
			},
		},
	});
	const isOwner = task?.user.id === userId;
	if (!isOwner) throw new AppError("You don't have permission", 403);
	const taskNewPosition = newTaskData.index_number;
	const hasChangedStatus = newTaskData.status !== task.status;
	const allTasks = task.user.tasks;

	if (taskNewPosition || taskNewPosition === 0) {
		const previousPosition = task.index_number;
		const tasksToUpdate: Task[] = [];

		if (hasChangedStatus) {
			allTasks.forEach((t) => {
				let taskUpdate = { ...t };
				if (
					(t.status === task.status && t.index_number > previousPosition) ||
					(t.status !== task.status && t.index_number >= taskNewPosition)
				) {
					taskUpdate.index_number += 1;
					tasksToUpdate.push(taskUpdate);
				}
			});
		} else {
			if (taskNewPosition > previousPosition) {
				allTasks.forEach((t) => {
					let taskUpdate = { ...t };
					if (
						t.index_number > previousPosition &&
						t.index_number <= taskNewPosition
					) {
						taskUpdate.index_number = taskUpdate.index_number - 1;
						tasksToUpdate.push(taskUpdate);
					}
				});
				// Procurar pelas tasks entre taskNewPosition e previousPosition e diminuir uma posição de todas essas tasks
			} else {
				console.log(tasksToUpdate, "tasksToUpdate atualizando aqui");

				allTasks.forEach((t) => {
					let taskUpdate = { ...t };

					if (
						t.index_number < previousPosition &&
						t.index_number >= taskNewPosition
					) {
						taskUpdate.index_number = taskUpdate.index_number + 1;
						console.log(taskUpdate, "TaskAtualizada");

						tasksToUpdate.push(taskUpdate);
					}
				});
				// Procurar pelas tasks entre previousPosition e aumentar uma posição de todas essas tasks
			}
		}

		for (let i = 0; i < tasksToUpdate.length; i++) {
			const taskUpdate = tasksToUpdate[i];
			// Procurar todas as posições acima da antiga posição e aumentar 1 e da nova posição e aumentar 1
			const updateNewPositions = await taskRepository.save(taskUpdate);
		}
		const updatedTask = { ...task, ...newTaskData };
		await taskRepository.save(updatedTask);
		return updatedTask;
	}

	if (hasChangedStatus) {
		// Adicionar a última posição da list.
		const filteredTasksByStatus = allTasks
			.filter((task) => task.status === newTaskData.status)
			.sort((a, b) => a.index_number - b.index_number);
		const lastPosition =
			filteredTasksByStatus[filteredTasksByStatus.length - 1]?.index_number + 1;
		newTaskData.index_number = lastPosition || 0;
	}

	const updatedTask = { ...task, ...newTaskData };
	await taskRepository.save(updatedTask);
	return updatedTask;
};

export default taskUpdateService;
