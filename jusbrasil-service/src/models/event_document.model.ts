import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { database as sequelize } from "@clients/database";

export class EventDocument extends Model<
  InferAttributes<EventDocument>,
  InferCreationAttributes<EventDocument>
> {
  declare event_id: string;
  declare label: string;
  declare description: string;
  declare created_at: string;
}

EventDocument.init(
  {
    event_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "event_document",
  }
);

export default EventDocument;
