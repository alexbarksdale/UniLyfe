export const limitText = (text: string, limit?: number): string => {
    if (limit && text.length >= limit) {
        return `${text.substring(0, limit)}...`;
    }
    return text;
};
