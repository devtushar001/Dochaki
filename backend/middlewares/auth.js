import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) { return res.json({ success: false, message: "Not authorized login again" }) }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token_decode)
        req.body.userID = token_decode.id;
        console.log(req.body.userID);
         next();
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Error in getting user id middleware"
        })
    }
}

export default isAuth;