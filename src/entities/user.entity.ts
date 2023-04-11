import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	@Exclude()
	password: string;

	@Column({ length: 120 })
	email: string;

	@OneToMany(() => Task, (task) => task.user)
	tasks: Task[];
}
