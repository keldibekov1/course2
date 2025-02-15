import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log("Token:", token); 

    try {
        const decoded = jwt.verify(token, "secret"); 
        console.log("Decoded Token:", decoded); 

        req.user = decoded; 
        next();
    } catch (error) {
        console.error("JWT Verify Error:", error.message);
        return res.status(403).json({ message: "Notogri yoki muddati otgan token" });
    }
};

export default verifyToken;
