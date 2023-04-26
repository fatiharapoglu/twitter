const bcrypt = require("bcrypt");

export const hashPassword = async (unHashedPassword: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(unHashedPassword, salt);
    return hashedPassword;
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        const passwordsMatch: boolean = await bcrypt.compare(plainPassword, hashedPassword);
        return passwordsMatch;
    } catch (error) {
        return false;
    }
};
