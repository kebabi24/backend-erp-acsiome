import UserService from "../../services/user"
import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
const login = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
    console.log(req.body)
    try {
        
        const userServiceInstance = Container.get(UserService)
        const { userName, password } = req.body
        const user = await userServiceInstance.findOne({
            usrd_user_name: userName,
        })
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })

        if (await argon2.verify(user.usrd_pwd, password)) {
           
            const token = jwt.sign({ user: user.id }, "acsiome")
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token } })
        } else
            return res
                .status(401)
                .json({ message: "error password", data: null })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}

const verifypwd = async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get("logger")
    logger.debug("Calling login endpoint")
    console.log(req.body)
    try {
        console.log(req.body)
        const userServiceInstance = Container.get(UserService)
        const { userName, password } = req.body
        
        const user = await userServiceInstance.findOne({
            usrd_user_name: userName,
        })
        if (!user)
            return res
                .status(401)
                .json({ message: "user not found", data: null })
        if (argon2.verify(user.usrd_pwd, password)) {
            const token = jwt.sign({ user: user.id }, "acsiome")
            return res
                .status(200)
                .json({ message: "succesfully", data: { user, token } })
        } else
            return res
                .status(401)
                .json({ message: "password error", data: null })
    } catch (e) {
        logger.error("🔥 error: %o", e)
        return next(e)
    }
}
export default {
    login,
    verifypwd,
}
