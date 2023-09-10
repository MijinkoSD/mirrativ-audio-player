import type { MovieInfo } from "@/types/m3u8";

/**
 * 動画全体の長さを取得します。
 * @param playlist 動画ファイルの情報
 * @returns 全体の長さ
 */
export const getMovieFullLength = (playlist: MovieInfo[]) => {
  let max = 0;
  for (const l of playlist) {
    max += l.movie_length;
  }
  return max;
};

/**
 * 再生時刻から再生中のファイルの番号を取得します。
 * @param current 再生時刻
 * @param playlist 動画ファイルの情報
 * @returns 番号等
 */
export const getMovieIndex = (current: number, playlist: MovieInfo[]): {
  /** playlist内の再生中のファイルの番号 */
  index: number;
  /** 再生中のファイル内の進行時間 */
  progressInAFile: number;
} => {
  let length = 0;
  let i = 0;
  for (const l of playlist) {
    if (current >= length) break;
    length += l.movie_length;
    i++;
  }
  return {
    index: i,
    progressInAFile: current - length,
  };
};
