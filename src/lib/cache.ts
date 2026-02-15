const cache = new Map<string, any>();
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

export function getCachedData(key: string) {
    const item = cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
    }
    return item.data;
}

export function setCachedData(key: string, data: any) {
    cache.set(key, {
        data,
        expiry: Date.now() + CACHE_DURATION_MS,
    });
}
