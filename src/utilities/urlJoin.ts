import { trim } from "./trim";

/**
 * URLを結合してから、URLのインスタンスを返します。
 * @param url URLパスに含める値
 * @param baseUrl 基準のURL（urlが相対パスの場合は省略不可）
 * @returns URLのインスタンス
 */
export const urlJoin = (url: string | string[], baseUrl?: string): URL => {
  const _url: string[] = Array.isArray(url)
    ? url.map((e) => trim(e, "/"))
    : [trim(url, "/")];
  const urlStr = _url.join("/");
  return new URL(urlStr, baseUrl);
};
