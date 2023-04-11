import { Request, Response } from "express";
import taskDeleteService from "../../services/tasks/taskDelete.service";

const taskDeleteController = async (req: Request, res: Response) => {
	const taskId = +req.params.id;
	const userId = +req.user.id;
	await taskDeleteService(taskId, userId);
	return res.status(204).json();
};

export default taskDeleteController;
