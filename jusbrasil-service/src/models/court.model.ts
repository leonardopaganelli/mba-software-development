import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { database as sequelize} from "@clients/database";

export class Court extends Model<
  InferAttributes<Court>,
  InferCreationAttributes<Court>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare alias: string;
  declare city: string;
  declare state: string;
}

Court.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    alias: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    state: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "court",
  }
);

export default Court;