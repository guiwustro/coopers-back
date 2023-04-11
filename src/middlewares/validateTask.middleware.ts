import { NextFunction, Request, Response } from "express";
import { ITaskRequest } from "./../interfaces/tasks/index";

import * as yup from "yup";

import { SchemaOf } from "yup";
import { TaskStatus } from "../entities/task.entity";

export const taskCreateSchema: SchemaOf<ITaskRequest> = yup.object().shape({
	name: yup.string().required(),
	status: yup.mixed<TaskStatus>().oneOf(Object.values(TaskStatus)).optional(),
});

export const validateTaskCreate =
	(schema: SchemaOf<ITaskRequest>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const taskInfo = req.body;

			try {
				const validatedTaskInfo = await schema.validate(taskInfo, {
					abortEarly: false,
					stripUnknown: true,
				});
				req.taskInfo = validatedTaskInfo;
				next();
			} catch (err: any) {
				return res.status(400).json({
					message: err.errors?.join(", "),
				});
			}
		} catch (error) {
			next();
		}
	};
