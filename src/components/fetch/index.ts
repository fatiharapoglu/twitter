export const getAllTweets = async () => {
    const response = await fetch("/api/tweets/all");
    return response.json();
};

export const createTweet = async (tweet: string) => {
    const response = await fetch(`/api/tweets/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tweet,
    });
    return response.json();
};

export const logIn = async (candidate: string) => {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: candidate,
    });
    return response.json();
};

export const createUser = async (newUser: string) => {
    const response = await fetch(`/api/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: newUser,
    });
    return response.json();
};
