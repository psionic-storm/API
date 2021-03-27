export interface Space {
  id: number;
  name: string;
  owner_id: string;
  owner_nickname: string;
  books?: Book[];
}

export interface Salon {
  id: number;
  name: string;
  creator_nickname: string;
  books?: Book[];
  participants?: Participant[];
}

export interface Participant {
  id: number;
  login_id: string;
  nickname: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  reviews?: Review[];
  quotes?: Quote[];
}

export interface Review {
  id: number;
  title: string;
  content: string;
  reviewer: string;
  created_at: string;
  updated_at: string;
  book_title: string;
  book_author: string;
  book_thumbnail: string;
  salon: string | null;
  space: string | null;
}

export interface Quote {
  id: number;
  content: string;
  page: string;
  quoter: string;
  created_at: string;
  updated_at: string;
  book_title: string;
  book_author: string;
  book_thumbnail: string;
  salon: string | null;
  space: string | null;
}

export interface Comment {
  id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  commenter: string;
}
