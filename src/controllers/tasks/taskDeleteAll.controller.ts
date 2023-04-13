import { Request, Response } from "express";
import taskDeleteAllService from "../../services/tasks/taskDeleteAll.service";

const taskDeleteAllController = async (req: Request, res: Response) => {
	const taskStatusToDelete = req.params.status as "done" | "progress";
	const userId = +req.user.id;

	await taskDeleteAllService(userId, taskStatusToDelete);
	return res.status(204).json();
};

export default taskDeleteAllController;
