import { Express } from "express";
import { sessionsRoutes } from "./sessions.routes";
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";

export const appRoutes = (app: Express) => {
	app.use("", sessionsRoutes());
	app.use("/users", userRoutes());
	app.use("/tasks", taskRoutes());
};
