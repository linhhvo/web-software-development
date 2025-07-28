import * as userRepo from '../repositories/userRepository.js';
import {setCookie} from "jsr:@hono/hono@4.6.5/cookie";
import {verify} from 'scrypt';
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";

const JWT_SECRET = "wsd-project-secret"
const COOKIE_KEY = "token"

export const registerUser = async (c) => {
    const user = await c.req.json()
    try {
        const result = await userRepo.add(user)
        return c.json({"message": "User added."})
    } catch (e) {
        return c.json({"message": "Error adding user."})
    }
}

export const verifyUser = async (c) => {
    const data = await c.req.json();
    const result = await userRepo.getUser(data);

    if (result.length === 0) {
        c.status(401)
        return c.json({"message": "Incorrect email or password."})
    }

    const user = result[0];
    const passwordValid = verify(data.password.trim(), user.password_hash)
    if (passwordValid) {
        const payload = {email: user.email}

        const token = await jwt.sign(payload, JWT_SECRET)

        setCookie(c, COOKIE_KEY, token, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            sameSite: "lax"
        })
        return c.json({"message": "Welcome!"})
    } else {
        c.status(401)
        return c.json({"message": "Incorrect email or password."})
    }
}