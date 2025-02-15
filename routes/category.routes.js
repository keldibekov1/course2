import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/category.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import selfPolice from "../middlewares/selfadmin.js";

const categoryRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Kurs kategoriyalarini boshqarish
 */

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     tags: [Category]
 *     description: Barcha mavjud kategoriyalarni olish uchun API
 *     responses:
 *       200:
 *         description: Kategoriyalar ro‘yxati
 */
categoryRoute.get("/all", findAll);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: ID bo‘yicha kategoriya olish
 *     tags: [Category]
 *     description: Berilgan ID bo‘yicha kategoriya ma'lumotini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kategoriya ID'si
 *     responses:
 *       200:
 *         description: Topilgan kategoriya
 *       404:
 *         description: Kategoriya topilmadi
 */
categoryRoute.get("/:id", findOne);

/**
 * @swagger
 * /api/category/search:
 *   get:
 *     summary: Kategoriya bo‘yicha qidirish
 *     tags: [Category]
 *     description: So‘rov bo‘yicha kategoriya qidirish
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Kategoriya nomi bo‘yicha qidirish
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
categoryRoute.get("/search", findBySearch);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Yangi kategoriya qo‘shish
 *     tags: [Category]
 *     description: Adminlar yangi kategoriya qo‘shishi mumkin
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
 *               desc:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kategoriya yaratildi
 *       403:
 *         description: Ruxsat yo‘q
 */
categoryRoute.post("/", verifyToken, selfPolice, create);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Kategoriya ma'lumotlarini yangilash
 *     tags: [Category]
 *     description: Adminlar kategoriyani yangilashi mumkin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yangilanishi kerak bo‘lgan kategoriya ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kategoriya muvaffaqiyatli yangilandi
 *       404:
 *         description: Kategoriya topilmadi
 */
categoryRoute.patch("/:id", verifyToken, selfPolice, update);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Kategoriya o‘chirish
 *     tags: [Category]
 *     description: Faqat adminlar kategoriyani o‘chirishi mumkin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chirilishi kerak bo‘lgan kategoriya ID'si
 *     responses:
 *       200:
 *         description: Kategoriya muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Kategoriya topilmadi
 */
categoryRoute.delete("/:id", verifyToken, selfPolice, remove);

export default categoryRoute;
