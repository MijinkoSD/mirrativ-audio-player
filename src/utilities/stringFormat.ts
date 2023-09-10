/**
 * "{key}"のような文字列を"value"に変換します。
 * keyとvalueの組み合わせはreplacementに辞書型で格納します。
 *
 * 例) pattern: "時刻: {time}", replacement: {time: "5:30"}
 *     結果: "時刻: 5:30"
 *
 * @param pattern 元の文字列
 * @param replacement 置換する文字列
 * @returns 置換後の文字列
 */
export const stringFormat = (
  pattern: string,
  replacement: { [key: string]: string | number | boolean | bigint },
): string => {
  for (const [k, v] of Object.entries(replacement)) {
    const regExp = new RegExp(`\\{\\s*${k}\\s*\\}`, "g");
    let strV: string;
    if (typeof v === "string") {
      strV = v;
    } else {
      strV = v.toString();
    }
    pattern = pattern.replace(regExp, strV);
  }
  return pattern;
};
