import jwt from "jsonwebtoken";
import User from "../models/auth.js";

const selfPolice = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token yoq yoki notogri" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

        let user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        req.user = user;

        if (user.type === "admin" || user.type === "teacher") {
            return next();
        }

        return res.status(403).json({ message: "Sizda bunday ruxsat yoq!" });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Yaroqsiz yoki muddati otgan token" });
    }
};

export default selfPolice;
