import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { database as sequelize } from "@clients/database";
import Subject from "./subject.model";

export class LawsuitSubject extends Model<
  InferAttributes<LawsuitSubject>,
  InferCreationAttributes<LawsuitSubject>
> {
  declare lawsuit_id: string;
  declare subject_id: string;
}

LawsuitSubject.init(
  {
    lawsuit_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    subject_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "lawsuit_subject",
  }
);

LawsuitSubject.belongsTo(Subject);

export default LawsuitSubject;