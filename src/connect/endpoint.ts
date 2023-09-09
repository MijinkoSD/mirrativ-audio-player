import type { AxiosResponse } from "axios";
import rest from "./axiosInit";
import type { MovieInfo } from "@/types/m3u8";

const endpoint = {
  "getM3u8Json": async (liveId: string): Promise<AxiosResponse<MovieInfo>> => {
    return rest.get(`/archive/${liveId}/m3u8/json`);
  },
};

export default endpoint;
