import { DataTypes } from "sequelize";
import database from "../config/db.js"; 

const User = database.define("User", {
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "student",
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "no course",
  },
  experience: {
    type: DataTypes.STRING,
    defaultValue: "no experience",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default User;
