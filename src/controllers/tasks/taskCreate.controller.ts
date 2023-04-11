import { ITaskRequest } from "./../../interfaces/tasks";
import { Request, Response } from "express";
import taskCreateService from "../../services/tasks/taskCreate.service";
import { instanceToPlain } from "class-transformer";

const taskCreateController = async (req: Request, res: Response) => {
	const newTaskData: ITaskRequest = req.taskInfo;
	const userId = +req.user.id;
	const newTask = await taskCreateService(newTaskData, userId);
	return res.status(201).json(instanceToPlain(newTask));
};

export default taskCreateController;
