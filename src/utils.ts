export function createRandomDictionary(n: number): Record<string, number> {
    const result: Record<string, number> = {};

    for (let i = 1; i <= n; i++) {
        const key = `value_${i}${Math.random().toString(36).substring(2, 5)}`;
        result[key] = Math.random();
    }

    return result;
}