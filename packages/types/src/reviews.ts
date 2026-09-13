export interface Review {
  id: string;
  bookingId?: string;
  jobId?: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  workerId: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  bookingId?: string;
  jobId?: string;
  workerId: string;
  rating: number;
  comment: string;
}

export interface WorkerReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

