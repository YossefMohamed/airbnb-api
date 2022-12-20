import Sequelize from "sequelize";
import { db } from "../db";

const Message = db.define("message", {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  property: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  author: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  to: {
    type: Sequelize.TEXT,
    allowNull: false,
  }, // Timestamps
});

export default Message;
