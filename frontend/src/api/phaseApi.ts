import { httpClient } from "./httpClient";
import type { PhaseSearchResponse } from "../types/project";

interface GetPhasesParams {
  pageNumber: number;
  pageSize: number;
  projectId?: number;
}

export async function getPhases(params: GetPhasesParams) {
  const response = await httpClient.get<PhaseSearchResponse>(
    "/portal/phases/search",
    { params },
  );

  return response.data;
}
