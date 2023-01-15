import {
  DataTypes,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { database as sequelize } from "@clients/database";
import Lawyer from "./lawyer.model";

export class Involved extends Model<
  InferAttributes<Involved>,
  InferCreationAttributes<Involved>
> {
  declare lawsuit_id: string;
  declare perpetrator: string;
  declare acused: string;
  declare plaintif_lawyer_id: string;
  declare defendant_lawyer_id: string;
  declare getPlaintifLawyer: HasOneGetAssociationMixin<Lawyer>;
  declare getDefendantLawyer: HasOneGetAssociationMixin<Lawyer>;
}

Involved.init(
  {
    lawsuit_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    perpetrator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acused: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plaintif_lawyer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defendant_lawyer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "involved",
  }
);

Involved.belongsTo(Lawyer, {
  foreignKey: "plaintif_lawyer_id",
  as: "plaintifLawyer",
});

Involved.belongsTo(Lawyer, {
  foreignKey: "defendant_lawyer_id",
  as: "defendantLawyer",
});

export default Involved;
