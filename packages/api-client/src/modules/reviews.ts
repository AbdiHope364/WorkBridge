import type { CreateReviewRequest, Review, WorkerReviewsResponse } from "@repo/types";
import type { ApiClient } from "../http";

export function createReviewsService(api: ApiClient) {
  return {
    getWorkerReviews(workerId: string) {
      return api.request<WorkerReviewsResponse>(`/reviews/worker/${workerId}`);
    },

    createReview(payload: CreateReviewRequest) {
      return api.request<{ success: boolean; review: Review }>("/reviews", {
        method: "POST",
        body: payload,
      });
    },
  };
}

