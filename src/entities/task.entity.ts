import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum TaskStatus {
	NEW = "new",
	IN_PROGRESS = "progress",
	DONE = "done",
}

@Entity("tasks")
export class Task {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "text" })
	name: string;

	@Column({ type: "enum", enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
	status: TaskStatus;

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;
}
