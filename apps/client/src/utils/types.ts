export interface Rating {
  id: number;
  user_id: number;
  film_id: number;
  rate: number;
}

export interface Comment {
  id: number;
  content: string;
  user_id: number;
  film_id: number | null;
  post_id: number | null;
}

export interface Post {
  id: number;
  title: string;
  user_id: number;
  film_id: number;
  comments: Comment[];
}

export interface Film {
  id: number;
  title: string;
  description: string;
  poster_url: string | null;
  author: string | null;
  language: string | null;
  trailer: string | null;
  actors: string | null;
  awards: string | null;
  released_date: string | null;
  created_at: string;
  posts: Post[];
  comments: Comment[];
  ratings: Rating[];
}

