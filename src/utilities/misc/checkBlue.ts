"use server";

export const checkBlueFromServer = async (input: string) => {
    const secret = process.env.BLUE_SECRET_KEY;
    if (secret !== input) return false;
    return true;
};
