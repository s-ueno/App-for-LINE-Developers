
export function NameOf<TModel>(exp: (m: TModel) => any) {
    return memberPath(exp).toString();
}
type ValueOf<T> = T[keyof T];
function memberPath<T, V extends T[keyof T]>(
    f: (x: T) => V
): ValueOf<{ [K in keyof T]: T[K] extends V ? K : never }>;
function memberPath(f: (x: any) => any): keyof any {
    var p = new Proxy({}, {
        get(target, prop) { return prop }
    })
    return f(p);
}