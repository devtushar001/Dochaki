import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({
                success: false,
                message: "Authorization token missing or invalid",
            });
        }

        // Get the token by removing "Bearer "
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to the request object
        req.user = { id: decoded.id };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token. Please log in again.",
        });
    }
};


export default isAuth;
