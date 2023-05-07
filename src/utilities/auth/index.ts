const verifyTokenFromServer = async (token: string) => {
    const response = await fetch("http://localhost:3000/api/auth/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
    });
    return response.json();
};

export const getJwtSecretKey = () => {
    const key = process.env.JWT_SECRET_KEY;
    if (!key) throw new Error("No JWT secret key");
    return new TextEncoder().encode(key);
};

export const verifyJwtToken = async (token: string) => {
    const response = await verifyTokenFromServer(token);
    if (!response) return null;
    return response;
};
