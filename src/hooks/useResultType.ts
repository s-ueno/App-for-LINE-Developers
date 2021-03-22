/**
 * 読み込み中のstate付きでデータ取得する カスタムHooksの共通戻り値を定義する
 */
export type useResultType<T> = [boolean, () => Promise<T>];
