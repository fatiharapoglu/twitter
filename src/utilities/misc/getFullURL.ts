export const getFullURL = (url: string) => {
    const storageURL = process.env.NEXT_PUBLIC_STORAGE_URL;
    if (!storageURL) throw new Error("Storage URL is not provided.");
    return `${storageURL}/${url}`;
};
