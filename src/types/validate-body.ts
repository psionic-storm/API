// user
export interface SignUpUserBody {
  loginId: string;
  nickname: string;
  password: string;
}

export interface SignInUserBody {
  loginId: string;
  password: string;
}

// space & salon
export interface UpdateSpaceBody {
  name: string;
}

export interface CreateSalonBody {
  name: string;
}

export type UpdateSalonBody = CreateSalonBody;

export interface AddBookBody {
  title: string;
  author: string;
  description: string;
}

export interface AddReviewBody {
  title: string;
  content: string;
}

export type UpdateReviewBody = AddReviewBody;

export interface AddReviewCommentBody {
  comment: string;
}

export type UpdateReviewCommentBody = AddReviewCommentBody;

export interface AddQuoteBody {
  content: string;
  page: number;
}

export type UpdateQuoteBody = AddQuoteBody;

export interface AddQuoteCommentBody {
  comment: string;
}

export type UpdateQuoteCommentBody = AddQuoteCommentBody;
