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

	@Column({ default: "progress" })
	status: "new" | "progress" | "done";

	@Column()
	index_number: number;

	@Column({ nullable: true })
	index_number_done: number;

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;
}
