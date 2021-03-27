
var setTimeoutHandle: { [key: string]: any } = {};
export function useMemoAsync() {
    const memoAsync = <T>(action: () => T, state: any[]) => {
        const key = JSON.stringify(state);
        clearTimeout(setTimeoutHandle[key]);

        return new Promise<T>((resolve, reject) => {
            setTimeoutHandle[key] = setTimeout(async () => {
                try {
                    const result = await action();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, 50);
        });
    }
    return memoAsync;
}