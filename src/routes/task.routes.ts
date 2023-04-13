import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware";
import taskCreateController from "../controllers/tasks/taskCreate.controller";
import taskGetController from "../controllers/tasks/taskGet.controller";
import taskUpdateController from "../controllers/tasks/taskUpdate.controller";
import taskDeleteController from "../controllers/tasks/taskDelete.controller";
import {
	taskCreateSchema,
	validateTaskCreate,
} from "../middlewares/validateTask.middleware";
import taskDeleteAllController from "../controllers/tasks/taskDeleteAll.controller";

const routes = Router();

export const taskRoutes = () => {
	routes.post(
		"",
		authUser,
		validateTaskCreate(taskCreateSchema),
		taskCreateController
	);
	routes.get("", authUser, taskGetController);
	routes.patch("/:id", authUser, taskUpdateController);
	routes.delete("/all/:status", authUser, taskDeleteAllController);
	routes.delete("/:id", authUser, taskDeleteController);

	return routes;
};
