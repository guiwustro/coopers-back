import { TaskStatus } from "../../entities/task.entity";
import { User } from "../../entities/user.entity";

export interface ITask {
	id: number;
	name: string;
	status: TaskStatus;
}

export interface ITaskRequest {
	name: string;
	status: TaskStatus;
}

export interface IEditTask {
	name?: string;
	status?: TaskStatus;
}
