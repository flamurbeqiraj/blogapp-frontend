import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Blog, BlogCreate, BlogPaging, PagedResoults } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  create(model: BlogCreate) : Observable<Blog> {
    return this.http.post<Blog>(`${environment.webApi}/Blog`, model);
  }

  getAll(blogPaging: BlogPaging) : Observable<PagedResoults<Blog>> {
    return this.http.get<PagedResoults<Blog>>(
      `${environment.webApi}/Blog?Page=${blogPaging.page}&PageSize=${blogPaging.pagesSize}`);
  }

  get(blogId: number) : Observable<Blog> {
    return this.http.get<Blog>(`${environment.webApi}/Blog/${blogId}`);
  }

  getByApplicationUserId(applicationUserId: number) : Observable<Blog[]> {
    return this.http.get<Blog[]>(`${environment.webApi}/Blog/user/${applicationUserId}`);
  }

  getMostFamous() : Observable<Blog[]> {
    return this.http.get<Blog[]>(`${environment.webApi}/Blog/famous`);
  }

  delete(blogId: number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/Blog/${blogId}`);
  }
}
