import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountCreate, AccountLogin, AccountProfile } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject$: BehaviorSubject<AccountProfile | null>

  constructor(
    private http: HttpClient
  ) { 
    this.currentUserSubject$ = new BehaviorSubject<AccountProfile | null>(JSON.parse(localStorage.getItem('blogLab-currentUser') || 'null'));
  }

  login(model: AccountLogin) : Observable<AccountProfile>  {
    return this.http.post(`${environment.webApi}/Account/login`, model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  register(model: AccountCreate) : Observable<AccountProfile> {
    return this.http.post(`${environment.webApi}/Account/register`, model).pipe(
      map((user: any) => {

        if (user) {
          localStorage.setItem('blogLab-currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }

        return user;
      })
    )
  }

  setCurrentUser(user: AccountProfile) {
    this.currentUserSubject$.next(user);
  }

  public get currentUserValue(): AccountProfile | null {
    return this.currentUserSubject$.value;
  }

  public givenUserIsLoggedIn(username: string) {
    return this.isLoggedIn() && this.currentUserValue!.username === username;
  }

  public isLoggedIn() {
    const currentUser = this.currentUserValue;
    const isLoggedIn = !!currentUser && !!currentUser.token;
    return isLoggedIn;
  }

  logout() {
    localStorage.removeItem('blogLab-currentUser');
    this.currentUserSubject$.next(null);
  }
}
