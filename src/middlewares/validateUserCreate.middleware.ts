import { IUserRequest } from "../interfaces/users";
import { Request, Response, NextFunction } from "express";

import * as yup from "yup";

import { SchemaOf } from "yup";

export const userCreateSchema: SchemaOf<IUserRequest> = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required(),
});

export const validateUserCreate =
	(schema: SchemaOf<IUserRequest>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userInfo = req.body;

			try {
				const validatedUserInfo = await schema.validate(userInfo, {
					abortEarly: false,
					stripUnknown: true,
				});
				req.newUser = validatedUserInfo;
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
