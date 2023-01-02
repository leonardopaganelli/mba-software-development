import { database, connect, databaseConfig } from "@clients/database";
import { Sequelize } from "sequelize";

jest.mock("../utils/config", () => ({
    DB_NAME: "DB_NAME",
    DB_USER: "DB_USER",
    DB_PASSWORD: "DB_PASSWORD",
    DB_HOST: "DB_HOST",
    DB_PORT: 1,
}));

describe("Database client", () => {
  beforeAll(() => {
    jest.mock("sequelize", () => ({
        authenticate: jest.fn()
    }))
  });

    it("Retrieve sequelize instance", async () => {
        expect(database).toBeInstanceOf(Sequelize);
    });

  it("Connect to database", async () => {
    jest.spyOn(database, "authenticate").mockResolvedValueOnce();

    await connect();

    expect(database.authenticate).toHaveBeenCalled();
  });

   it("Error to connect to database", async () => {
     jest.spyOn(database, "authenticate").mockImplementation(() => {
       throw new Error("Not connected");
     });

     await connect();

     expect(database.authenticate).rejects;
   });

    it("Retrieve database config", async () => {
        const defaultConfig = {
          dialect: "postgres",
          database: "DB_NAME",
          username: "DB_USER",
          password: "DB_PASSWORD",
          host: "DB_HOST",
          port: 1,
          define: {
            underscored: true,
            createdAt: false,
            updatedAt: false,
          },
        };

       expect(databaseConfig).toStrictEqual(defaultConfig);
     });
});
