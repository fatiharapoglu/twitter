export const getAllTweets = async () => {
    const response = await fetch("http://localhost:3000/api/tweets/all", {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserTweets = async (username: string) => {
    const response = await fetch(`http://localhost:3000/api/tweets/${username}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserTweet = async (tweetId: string, tweetAuthor: string) => {
    const response = await fetch(`http://localhost:3000/api/tweets/${tweetAuthor}/${tweetId}`, {
        next: {
            revalidate: 0,
        },
    });
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

export const logInAsTest = async () => {
    const testAccount = {
        username: "test",
        password: "123456789",
    };
    return await logIn(JSON.stringify(testAccount));
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

export const getUser = async (username: string) => {
    const response = await fetch(`http://localhost:3000/api/users/${username}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const updateTweetLikes = async (tweetId: string, tweetAuthor: string, tokenOwnerId: string, isLiked: boolean) => {
    const route = isLiked ? "unlike" : "like";
    const response = await fetch(`http://localhost:3000/api/tweets/${tweetAuthor}/${tweetId}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tokenOwnerId,
    });
    return response.json();
};
