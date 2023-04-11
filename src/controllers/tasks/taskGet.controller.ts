import { Request, Response } from "express";
import taskGetService from "../../services/tasks/taskGet.service";
import { instanceToPlain } from "class-transformer";

const taskGetController = async (req: Request, res: Response) => {
	const { id } = req.user;
	const tasks = await taskGetService(id);
	return res.json(instanceToPlain(tasks));
};

export default taskGetController;
