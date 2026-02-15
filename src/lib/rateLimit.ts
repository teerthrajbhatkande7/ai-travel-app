interface RateLimit {
    count: number;
    lastReset: number;
}

const rateLimitMap = new Map<string, RateLimit>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const rule = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - rule.lastReset > WINDOW_MS) {
        rule.count = 1;
        rule.lastReset = now;
    } else {
        rule.count++;
    }

    rateLimitMap.set(ip, rule);
    return rule.count <= MAX_REQUESTS;
}
