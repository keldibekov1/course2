import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/course.controller.js";
import selfPolice from "../middlewares/selfadmin.js";
import verifyToken from "../middlewares/verifyToken.js";

const courseRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Course
 *     description: Kurslarni boshqarish
 */

/**
 * @swagger
 * /api/course/all:
 *   get:
 *     summary: Barcha kurslarni olish
 *     tags: [Course]
 *     description: Mavjud barcha kurslarni olish
 *     responses:
 *       200:
 *         description: Kurslar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
courseRoute.get("/all", findAll);

/**
 * @swagger
 * /api/course/{id}:
 *   get:
 *     summary: ID bo‘yicha kursni olish
 *     tags: [Course]
 *     description: Berilgan ID bo‘yicha kurs ma'lumotini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID'si
 *     responses:
 *       200:
 *         description: Topilgan kurs
 *       404:
 *         description: Kurs topilmadi
 */
courseRoute.get("/:id", findOne);

/**
 * @swagger
 * /api/course/search:
 *   get:
 *     summary: Kursni qidirish
 *     tags: [Course]
 *     description: Berilgan so‘rov bo‘yicha kursni qidirish
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Kurs nomi bo‘yicha qidirish
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 *       500:
 *         description: Server xatosi
 */
courseRoute.get("/search", findBySearch);

/**
 * @swagger
 * /api/course:
 *   post:
 *     summary: Yangi kurs qo‘shish
 *     tags: [Course]
 *     description: Faqat admin yoki o‘qituvchilar yangi kurs qo‘shishi mumkin
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
 *               categoryId:
 *                 type: integer
 *               teacherId:
 *                 type: integer
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kurs muvaffaqiyatli yaratildi
 *       403:
 *         description: Ruxsat yo‘q
 */
courseRoute.post("/", verifyToken, selfPolice, create);

/**
 * @swagger
 * /api/course/{id}:
 *   patch:
 *     summary: Kurs ma'lumotlarini yangilash
 *     tags: [Course]
 *     description: Faqat admin yoki kurs muallifi yangilashi mumkin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yangilanishi kerak bo‘lgan kurs ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               teacherId:
 *                 type: integer
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kurs muvaffaqiyatli yangilandi
 *       404:
 *         description: Kurs topilmadi
 */
courseRoute.patch("/:id", verifyToken, selfPolice, update);

/**
 * @swagger
 * /api/course/{id}:
 *   delete:
 *     summary: Kursni o‘chirish
 *     tags: [Course]
 *     description: Faqat admin yoki kurs muallifi kursni o‘chirishi mumkin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chirilishi kerak bo‘lgan kurs ID'si
 *     responses:
 *       200:
 *         description: Kurs muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Kurs topilmadi
 */
courseRoute.delete("/:id", verifyToken, selfPolice, remove);

export default courseRoute;
