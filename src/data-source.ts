import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
	process.env.NODE_ENV === "test"
		? {
				type: "sqlite",
				database: ":memory:",
				entities: ["src/entities/*.ts"],
				synchronize: true,
		  }
		: {
				type: "postgres",
				ssl:
					process.env.NODE_ENV === "production"
						? { rejectUnauthorized: false }
						: false,
				logging: true,
				synchronize: true,
				entities:
					process.env.NODE_ENV === "production"
						? ["dist/src/entities/*.js"]
						: ["src/entities/*.ts"],
				migrations:
					process.env.NODE_ENV === "production"
						? ["dist/src/migrations/*.js"]
						: ["src/migrations/*.ts"],
				host: process.env.DB_HOST,
				port: 5432,
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB,
				url:
					process.env.NODE_ENV === "production"
						? process.env.DATABASE_URL
						: undefined,
		  }
);

export default AppDataSource;
