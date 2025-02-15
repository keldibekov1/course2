import { Router } from "express";
import { FindAll, FindOne, Create, Update, Remove } from "../controllers/comment.controller.js";
import selfComment from "../middlewares/selfComment.js";
import verifyToken from "../middlewares/verifyToken.js";

let CommentRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Comment
 *     desc: Foydalanuvchi sharhlarini boshqarish
 */

/**
 * @swagger
 * /api/comment/all:
 *   get:
 *     summary: Barcha sharhlarni olish
 *     tags: [Comment]
 *     responses:
 *       200:
 *         desc: Sharhlar ro‘yxati
 *       500:
 *         desc: Server xatosi
 */
CommentRoute.get("/all", FindAll);

/**
 * @swagger
 * /api/comment/{id}:
 *   get:
 *     summary: ID bo‘yicha sharhni olish
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         desc: Topilgan sharh
 *       404:
 *         desc: Sharh topilmadi
 */
CommentRoute.get("/:id", FindOne);

/**
 * @swagger
 * /api/comment:
 *   post:
 *     summary: Yangi sharh qo‘shish
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: integer
 *               courseId:
 *                 type: integer
 *               desc:
 *                 type: string
 *               star:
 *                 type: integer
 *     responses:
 *       201:
 *         desc: Sharh muvaffaqiyatli yaratildi
 *       403:
 *         desc: Ruxsat yo‘q
 */
CommentRoute.post("/", verifyToken, Create);

/**
 * @swagger
 * /api/comment/{id}:
 *   patch:
 *     summary: Sharhni yangilash
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *               star:
 *                 type: integer
 *     responses:
 *       200:
 *         desc: Sharh muvaffaqiyatli yangilandi
 *       404:
 *         desc: Sharh topilmadi
 */
CommentRoute.patch("/:id",verifyToken, selfComment, Update);

/**
 * @swagger
 * /api/comment/{id}:
 *   delete:
 *     summary: Sharhni o‘chirish
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         desc: Sharh muvaffaqiyatli o‘chirildi
 *       404:
 *         desc: Sharh topilmadi
 */
CommentRoute.delete("/:id", verifyToken,selfComment, Remove);

export default CommentRoute;
