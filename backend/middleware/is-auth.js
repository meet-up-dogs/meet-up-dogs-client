import express from "express";
import jwt from "jsonwebtoken";


export default async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader.startWith('Bearer ')) return res.sendStatus(401);

    console.log(authHeader)
    const token = authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)

    console.log(token, process.env.TOKEN_SECRET)
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedToken) {
            req.userId = decodedToken.userId;
            req.userName = decodedToken.userName;
        }
    } catch (error) {
        console.debug("JWT verification Error", error.message)
        return res.sendStatus(403)
    }
    next()

}