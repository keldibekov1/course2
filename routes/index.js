import { Router } from "express";
import CommentRoute from "./comment.routes.js";
import LessonRoute from "./lesson.routes.js";
import courseRoute from "./course.routes.js";
import categoryRoute from "./category.routes.js";

let mainRoute = Router()

mainRoute.use("/comment", CommentRoute)
mainRoute.use("/lesson", LessonRoute)
mainRoute.use("/course", courseRoute);
mainRoute.use("/category", categoryRoute);

export default mainRoute;