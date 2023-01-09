import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Court from "@models/court.model";
import { database as sequelize } from "@clients/database";
import Involved from "@models/involved.model";
import LawsuitSubject from "./lawsuit_subject.model";

export class Lawsuit extends Model<
  InferAttributes<Lawsuit>,
  InferCreationAttributes<Lawsuit>
> {
  declare id: string;
  declare nature: string;
  declare judicialBranch: string;
  declare initDate: Date;
  declare amountInControversy: number;
  declare courtId: number;
}

Lawsuit.init(
  {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nature: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    judicialBranch: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    initDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amountInControversy:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    courtId:{
        type: DataTypes.DOUBLE,
        allowNull: false
    }
  },
  {
    sequelize,
    tableName: "lawsuit"
  }
);

Lawsuit.belongsTo(Court, {
  foreignKey: "court_id",
})

Lawsuit.hasOne(Involved, {
  sourceKey: "id",
  onDelete: "cascade",
  hooks: true,
});

Lawsuit.hasMany(LawsuitSubject, {
  sourceKey: "id",
  onDelete: "cascade",
  hooks: true,
});

export default Lawsuit;