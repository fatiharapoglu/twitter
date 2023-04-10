import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
    const key = process.env.JWT_SECRET_KEY;
    if (!key) throw new Error("No JWT secret key");
    return new TextEncoder().encode(key);
};

export const verifyJwtToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return payload;
    } catch (error) {
        return null;
    }
};
