import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedUser } from "../mocks";

describe("/users", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err);
			});
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /users -  Must be able to create a user", async () => {
		const response = await request(app).post("/users").send(mockedUser);

		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("username");
		expect(response.body).not.toHaveProperty("password");

		expect(response.body.username).toEqual("guilherme@user.com");

		expect(response.status).toBe(201);
	});

	test("POST /users -  should not be able to create a user that already exists", async () => {
		const response = await request(app).post("/users").send(mockedUser);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(400);
	});
});
