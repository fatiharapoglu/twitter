const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleepFunction = async () => {
    await sleep(1000);
};
