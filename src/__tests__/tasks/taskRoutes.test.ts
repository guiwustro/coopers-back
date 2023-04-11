import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedUser } from "../mocks";

describe("/tasks", () => {
	let connection: DataSource;
	let token: string;
	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err);
			});
		await request(app).post("/users").send(mockedUser);
		const responseLogin = await request(app).post("/login").send(mockedUser);
		token = responseLogin.body.token;
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /tasks -  Must be able to create new tasks", async () => {
		// Create 20 tasks
		for (let i = 0; i < 20; i++) {
			const data = {
				name: `Task number ${i}`,
				status: "progress",
			};
			const responseTask = await request(app)
				.post("/tasks")
				.send(data)
				.set("Authorization", `Bearer ${token}`);
			expect(responseTask.status).toBe(201);

			expect(responseTask.body).toHaveProperty("id");
			expect(responseTask.body).toHaveProperty("name");
			expect(responseTask.body).toHaveProperty("status");
			expect(responseTask.body).toHaveProperty("index_number");
		}
	});

	test("GET /tasks -  should be able to list all tasks", async () => {
		const response = await request(app)
			.get("/tasks")
			.set("Authorization", `Bearer ${token}`);
		expect(response.body.length).toEqual(20);
		expect(response.status).toBe(200);
	});

	test("PATCH /tasks/:id -  should be able to change the order correctly", async () => {
		const response = await request(app)
			.get("/tasks")
			.set("Authorization", `Bearer ${token}`);

		// Colocar a Task 1 entre a Task 4 e 5
		const task1 = response.body[0];
		const task4Index = response.body[3].index_number;
		const task5Index = response.body[4].index_number;

		const newIndex = (task4Index + task5Index) / 2;

		const responseTask = await request(app)
			.patch(`/tasks/${task1.id}`)
			.send({ index_number: newIndex })
			.set("Authorization", `Bearer ${token}`);
		expect(responseTask.status).toBe(200);
		expect(responseTask.body.index_number).toEqual(newIndex);
	});
});
