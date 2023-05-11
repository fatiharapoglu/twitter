import { NotificationContent, NotificationTypes } from "@/types/NotificationProps";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

export const getAllTweets = async (page = "1") => {
    const response = await fetch(`${HOST_URL}/api/tweets/all?page=${page}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getRelatedTweets = async () => {
    const response = await fetch(`${HOST_URL}/api/tweets/related`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserTweets = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${username}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserLikes = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${username}/likes`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserMedia = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${username}/media`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserReplies = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${username}/replies`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const getUserTweet = async (tweetId: string, tweetAuthor: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${tweetAuthor}/${tweetId}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const createTweet = async (tweet: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tweet,
    });
    return response.json();
};

export const logIn = async (candidate: string) => {
    const response = await fetch(`${HOST_URL}/api/auth/login`, {
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

export const logout = async () => {
    await fetch(`${HOST_URL}/api/auth/logout`, {
        next: {
            revalidate: 0,
        },
    });
};

export const createUser = async (newUser: string) => {
    const response = await fetch(`${HOST_URL}/api/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: newUser,
    });
    return response.json();
};

export const getUser = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/users/${username}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const editUser = async (updatedUser: string, username: string) => {
    const response = await fetch(`${HOST_URL}/api/users/${username}/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: updatedUser,
    });
    return response.json();
};

export const updateTweetLikes = async (tweetId: string, tweetAuthor: string, tokenOwnerId: string, isLiked: boolean) => {
    const route = isLiked ? "unlike" : "like";
    const response = await fetch(`${HOST_URL}/api/tweets/${tweetAuthor}/${tweetId}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tokenOwnerId,
    });
    return response.json();
};

export const updateRetweets = async (tweetId: string, tweetAuthor: string, tokenOwnerId: string, isRetweeted: boolean) => {
    const route = isRetweeted ? "unretweet" : "retweet";
    const response = await fetch(`${HOST_URL}/api/tweets/${tweetAuthor}/${tweetId}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tokenOwnerId,
    });
    return response.json();
};

export const updateUserFollows = async (followedUsername: string, tokenOwnerId: string, isFollowed: boolean) => {
    const route = isFollowed ? "unfollow" : "follow";
    const response = await fetch(`${HOST_URL}/api/users/${followedUsername}/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tokenOwnerId,
    });
    return response.json();
};

export const deleteTweet = async (tweetId: string, tweetAuthor: string, tokenOwnerId: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${tweetAuthor}/${tweetId}/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: tokenOwnerId,
    });
    return response.json();
};

export const createReply = async (reply: string, tweetAuthor: string, tweetId: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${tweetAuthor}/${tweetId}/reply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: reply,
    });
    return response.json();
};

export const getReplies = async (tweetAuthor: string, tweetId: string) => {
    const response = await fetch(`${HOST_URL}/api/tweets/${tweetAuthor}/${tweetId}/reply`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const search = async (text: string) => {
    const response = await fetch(`${HOST_URL}/api/search?q=${text}`);
    return response.json();
};

export const getRandomThreeUsers = async () => {
    const response = await fetch(`${HOST_URL}/api/users/random`);
    return response.json();
};

export const createMessage = async (message: string) => {
    const response = await fetch(`${HOST_URL}/api/messages/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: message,
    });
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json;
};

export const getUserMessages = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/messages/${username}`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const checkUserExists = async (username: string) => {
    const response = await fetch(`${HOST_URL}/api/users/exists?q=${username}`);
    return response.json();
};

export const deleteConversation = async (participants: string[], tokenOwnerId: string) => {
    const response = await fetch(`${HOST_URL}/api/messages/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ participants, tokenOwnerId }),
    });
    return response.json();
};

export const getNotifications = async () => {
    const response = await fetch(`${HOST_URL}/api/notifications`, {
        next: {
            revalidate: 0,
        },
    });
    return response.json();
};

export const createNotification = async (
    recipient: string,
    type: NotificationTypes,
    secret: string,
    notificationContent: NotificationContent = null
) => {
    const response = await fetch(`${HOST_URL}/api/notifications/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, type, secret, notificationContent }),
    });
    return response.json();
};
