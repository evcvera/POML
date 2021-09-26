export interface IMeliItemOpinion {
  paging?: Paging;
  reviews?: Review[];
  rating_average?: number;
  rating_levels?: RatingLevels;
  helpful_reviews?: HelpfulReviews;
  attributes?: any[];
}

export interface HelpfulReviews {
  best_max_stars: null;
  best_min_stars: null;
}

export interface Paging {
  total: number;
  limit: number;
  offset: number;
}

export interface RatingLevels {
  one_star: number;
  two_star: number;
  three_star: number;
  four_star: number;
  five_star: number;
}

export interface Review {
  id: number;
  reviewable_object: ReviewableObject;
  date_created: Date;
  status: string;
  title: string;
  content: string;
  rate: number;
  valorization: number;
  likes: number;
  dislikes: number;
  reviewer_id: number;
  buying_date: Date;
  relevance: number;
  forbidden_words: number;
}

export interface ReviewableObject {
  id: string;
  type: string;
}

