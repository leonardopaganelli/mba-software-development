import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { database as sequelize } from "@clients/database";

export class Lawyer extends Model<
  InferAttributes<Lawyer>,
  InferCreationAttributes<Lawyer>
> {
  declare id: string;
  declare name: string;
}

Lawyer.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "lawyer",
  }
);

export default Lawyer;
