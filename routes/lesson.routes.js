import { Router } from "express";
import { findAll, findOne, findBySearch, create, update, remove } from "../controllers/lesson.controller.js";
import selfPolice from "../middlewares/selfadmin.js";
import verifyToken from "../middlewares/verifyToken.js";

let LessonRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Lesson
 *     description: Darslarni boshqarish
 */

/**
 * @swagger
 * /api/lesson/all:
 *   get:
 *     summary: Barcha darslarni olish
 *     tags: [Lesson]
 *     description: Mavjud barcha darslarni olish
 *     responses:
 *       200:
 *         description: Darslar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
LessonRoute.get("/all", findAll);

/**
 * @swagger
 * /api/lesson/{id}:
 *   get:
 *     summary: ID bo‘yicha darsni olish
 *     tags: [Lesson]
 *     description: Berilgan ID bo‘yicha dars ma'lumotini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Dars ID'si
 *     responses:
 *       200:
 *         description: Topilgan dars
 *       404:
 *         description: Dars topilmadi
 */
LessonRoute.get("/:id", findOne);

/**
 * @swagger
 * /api/lesson/search:
 *   get:
 *     summary: Darsni qidirish
 *     tags: [Lesson]
 *     description: Berilgan so‘rov bo‘yicha darsni qidirish
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Dars nomi bo‘yicha qidirish
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 *       500:
 *         description: Server xatosi
 */
LessonRoute.get("/search", findBySearch);

/**
 * @swagger
 * /api/lesson:
 *   post:
 *     summary: Yangi dars qo‘shish
 *     tags: [Lesson]
 *     description: Faqat admin yoki o‘qituvchilar yangi dars qo‘shishi mumkin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *               courseId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dars muvaffaqiyatli yaratildi
 *       403:
 *         description: Ruxsat yo‘q
 */
LessonRoute.post("/", verifyToken, selfPolice, create);

/**
 * @swagger
 * /api/lesson/{id}:
 *   patch:
 *     summary: Dars ma'lumotlarini yangilash
 *     tags: [Lesson]
 *     description: Faqat admin yoki dars muallifi yangilashi mumkin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yangilanishi kerak bo‘lgan dars ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *               courseId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dars muvaffaqiyatli yangilandi
 *       404:
 *         description: Dars topilmadi
 */
LessonRoute.patch("/:id", verifyToken, selfPolice, update);

/**
 * @swagger
 * /api/lesson/{id}:
 *   delete:
 *     summary: Darsni o‘chirish
 *     tags: [Lesson]
 *     description: Faqat admin yoki dars muallifi darsni o‘chirishi mumkin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chirilishi kerak bo‘lgan dars ID'si
 *     responses:
 *       200:
 *         description: Dars muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Dars topilmadi
 */
LessonRoute.delete("/:id", verifyToken, selfPolice, remove);

export default LessonRoute;
