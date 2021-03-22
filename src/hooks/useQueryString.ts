

export function useQueryString(): (key: string) => string | null {
    const queryParams = new URLSearchParams(window.location.search);
    return (key: string) => {
        return queryParams.get(key);
    };
}