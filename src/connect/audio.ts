import { Howl } from "howler";
import { backendBaseUrl } from "./common";
import { urlJoin } from "@/utilities/urlJoin";

export const getPlayer = (
  liveId: string,
  filename: string | string[],
): Howl => {
  if (!Array.isArray(filename)) filename = [filename];
  const filenames = filename.map((e) =>
    urlJoin([backendBaseUrl, "archive", liveId, "audio", e]).href
  );
  const player = new Howl({
    src: filenames,
  });
  return player;
};
