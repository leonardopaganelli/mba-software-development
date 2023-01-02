import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { database as sequelize } from "@clients/database";
import Lawsuit from "./lawsuit.model";
import EventDocument from "./event_document.model";

export class LawsuitEvent extends Model<
  InferAttributes<LawsuitEvent>,
  InferCreationAttributes<LawsuitEvent>
> {
  declare id: CreationOptional<string>;
  declare lawsuit_id: string;
  declare date: string;
}

LawsuitEvent.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    lawsuit_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "lawsuit_event",
  }
);

LawsuitEvent.belongsTo(Lawsuit);

LawsuitEvent.hasMany(EventDocument, {
  sourceKey: "id",
  foreignKey: 'event_id'
});

export default LawsuitEvent;
