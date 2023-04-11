import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import UserGetController from "../controllers/users/userGet.controller";
import {
	userCreateSchema,
	validateUserCreate,
} from "../middlewares/validateUserCreate.middleware";
import { authUser } from "./../middlewares/authUser.middleware";

const routes = Router();

export const userRoutes = () => {
	routes.post("", validateUserCreate(userCreateSchema), userCreateController);
	routes.get("", authUser, UserGetController);

	return routes;
};
