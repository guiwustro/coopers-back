import { Request, Response } from "express";
import { IEditTask } from "../../interfaces/tasks";
import taskUpdateService from "../../services/tasks/taskUpdate.service";
import { instanceToPlain } from "class-transformer";

const taskUpdateController = async (req: Request, res: Response) => {
	const newTaskData: IEditTask = req.body;
	const taskId = req.params.id;
	const userId = +req.user.id;

	const taskData = {
		id: +taskId,
		...newTaskData,
	};

	const newTask = await taskUpdateService(taskData, userId);
	return res.status(200).json(instanceToPlain(newTask));
};

export default taskUpdateController;
