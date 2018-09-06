
  export interface Post{
    userId: number;
    id: number;
    title: string;
    body: string;
    isComment: boolean;
  }

  export interface Comment {
    body: string;
    email: string;
    id: number;
    name: string;   
    postId: number;
}

export interface PostForm {
  userId: number;
  body: string;
  title: string;
  isComment: boolean;
}