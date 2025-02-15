import { DataTypes } from "sequelize";
import database from "../config/db.js";
import User from "./auth.js";

const Comment = database.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

import Course from "./course.model.js";

Course.hasMany(Comment, { foreignKey: "courseId", onDelete: "CASCADE" });
Comment.belongsTo(Course, { foreignKey: "courseId" });

export default Comment;
