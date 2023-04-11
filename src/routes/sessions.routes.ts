import { Router } from "express";

import UserLoginController from "../controllers/users/userLogin.controller";

const routes = Router();

export const sessionsRoutes = () => {
	routes.post("/login", UserLoginController);

	return routes;
};
