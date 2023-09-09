// TODO: 単体テスト作成して

/**
 * targetに一致するbaseの最初の部分を削除します。
 * @param base 削除される対象
 * @param target 削除する文字
 * @returns 削除した後の文字列
 */
export const trimStart = (base: string, target: string = " "): string => {
  while (base.startsWith(target)) {
    base = base.slice(target.length);
  }
  return base;
};

/**
 * targetに一致するbaseの末尾の部分を削除します。
 * @param base 削除される対象
 * @param target 削除する文字
 * @returns 削除した後の文字列
 */
export const trimEnd = (base: string, target: string = " "): string => {
  while (base.endsWith(target)) {
    base = base.slice(0, base.length - target.length);
  }
  return base;
};

/**
 * targetに一致するbaseの最初と末尾の部分を削除します。
 * @param base 削除される対象
 * @param target 削除する文字
 * @returns 削除した後の文字列
 */
export const trim = (base: string, target: string = " "): string => {
  return trimEnd(trimStart(base, target), target);
};
