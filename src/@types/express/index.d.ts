import { ITaskRequest } from "../../interfaces/tasks";
import { IUserRequest, IUserUpdate } from "./../../interfaces/users/index";
import * as express from "express";

declare global {
	namespace Express {
		interface Request {
			user: {
				id: number;
			};
			newUser: IUserRequest;
			taskInfo: ITaskRequest;
		}
	}
}
