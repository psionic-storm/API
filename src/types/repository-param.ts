// user
export interface CreateUserParams {
  loginId: string;
  nickname: string;
  hashedPasswordAndSalt: { hashedPassword: string; salt: string };
}

// space & salon
export interface CreateSpaceParams {
  userId: number;
  userNickname: string;
}

export interface UpdateSpaceParams {
  name: string;
  spaceId: number;
}

export interface CreateSalonParams {
  name: string;
  userId: number;
}

export interface AddSalonMemberParams {
  salonId: number;
  userId: number;
}

export interface UpdateSalonParams {
  name: string;
  salonId: number;
}

export interface CreateBookParams {
  title: string;
  author: string;
  description: string;
  spaceId?: number;
  salonId?: number;
}

export interface CreateReviewParams {
  title: string;
  content: string;
  bookId: number;
  userId: number;
}

export interface UpdateReviewParams {
  title: string;
  content: string;
  reviewId: number;
}

export interface CreateReviewCommentParams {
  comment: string;
  reviewId: number;
  bookId: number;
  userId: number;
}

export interface UpdateReviewCommentParams {
  comment: string;
  commentId: number;
}

export interface CreateQuoteParams {
  content: string;
  page: number;
  bookId: number;
  userId: number;
}

export interface UpdateQuoteParams {
  content: string;
  page: number;
  quoteId: number;
}

export interface CreateQuoteCommentParams {
  comment: string;
  quoteId: number;
  bookId: number;
  userId: number;
}

export interface UpdateQuoteCommentParams {
  comment: string;
  commentId: number;
}
