import Lesson from "../models/lesson.model.js";


async function findAll(req, res) {
    try {
        let lessons = await Lesson.findAll();
        res.status(200).json({ data: lessons });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

async function findOne(req, res) {
    try {
        let { id } = req.params;
        let lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        res.status(200).json({ data: lesson });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

async function findBySearch(req, res) {
    try {
        let query = req.query;
        let filteredQuery = {};

        Object.keys(query).forEach((key) => {
            if (query[key]) {
                filteredQuery[key] = query[key];
            }
        });

        let lessons = await Lesson.findAll({ where: filteredQuery });
        res.status(200).json({ data: lessons });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        let created = await Lesson.create(req.body);
        res.status(201).json({ data: created });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        let { id } = req.params;
        let data = req.body;

        let result = await Lesson.update(data, { where: { id } });

        if (!result[0]) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json({ message: "Lesson updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const deletedData = await Lesson.destroy({ where: { id } });

        if (!deletedData) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

export { findAll, findOne, findBySearch, create, update, remove };
