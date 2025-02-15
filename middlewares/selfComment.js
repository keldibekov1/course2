import Comment from "../models/comment.model.js";

const selfComment = async (req, res, next) => {
    try {
        console.log("Token decoded:", req.user); 

        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
        }

        const { id } = req.params;
        const userEmail = req.user.email;
        const userType = req.user.type;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment topilmadi" });
        }

        if (userType === "admin" || comment.authorEmail === userEmail) {
            return next();
        }

        return res.status(403).json({ message: "Siz bu kommentni ochira olmaysiz" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi" });
    }
};

export default selfComment;
