import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Course from "./course.model.js";

const Lesson = database.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Course,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    description: { 
        type: DataTypes.STRING
    }
});

Course.hasMany(Lesson, { foreignKey: "courseId", onDelete: "CASCADE" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

export default Lesson;
