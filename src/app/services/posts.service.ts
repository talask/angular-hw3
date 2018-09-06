import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { PostForm } from '../models/Post';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.api_url;
  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  deletePost(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/posts/${id}`);
  }

  addPost(post: PostForm): Observable<PostForm>{
    return this.http.post<PostForm>(`${this.apiUrl}/posts`, post);
  }
  
  showPost(id: number): Observable<Object> {
    return this.http.get<Object>(`${this.apiUrl}/comments?postId=${id}`);
  }

}
