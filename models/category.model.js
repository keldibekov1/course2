import { DataTypes } from "sequelize";
import database from "../config/db.js";

const Category= database.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
      },
      desc: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default Category;