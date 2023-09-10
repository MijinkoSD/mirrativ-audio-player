import { Howl, type HowlOptions } from "howler";
import { backendBaseUrl } from "./common";
import { urlJoin } from "@/utilities/urlJoin";

export const getPlayer = (
  liveId: string,
  filename: string | string[],
  options: Partial<HowlOptions> = {},
): Howl => {
  if (!Array.isArray(filename)) filename = [filename];
  const filenames = filename.map((e) =>
    urlJoin([backendBaseUrl, "archive", liveId, "audio", e]).href
  );
  console.log(filenames);
  const _options: HowlOptions = {
    ...options,
    src: filenames,
  };
  const player = new Howl(_options);
  return player;
};
