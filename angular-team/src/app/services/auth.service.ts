import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User, Login, UserNoPW } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // authToken: any;
  // user: User;
  // userNoPW: UserNoPW;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  prepEndpoint(ep) {
    // 1. 로컬 서버에서 개발시
    //return 'http://localhost:3000/' + ep;

    // 2. 클라우드 서버에서 운영시
    return ep;
  }

  registerUser(user): Observable<any> {
    const registerUrl = this.prepEndpoint('users/register');

    return this.http.post(registerUrl, user, httpOptions);
  }

  authenticateUser(login: Login): Observable<any> {
    // const loginUrl = 'http://localhost:3000/users/authenticate';
    const loginUrl = this.prepEndpoint('users/authenticate');

    return this.http.post<any>(loginUrl, login, httpOptions);
  }

  storeUserData(token: any, userNoPW: UserNoPW) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userNoPW', JSON.stringify(userNoPW));
  }

  logout() {
    localStorage.clear();
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('userNoPW');
  }

  // Show user list (just testing DB query)
  getList(): Observable<any> {
    const listUrl = this.prepEndpoint('users/list');
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    return this.http.get<any>(listUrl, httpOptions1);
  }

  loggedIn(): boolean {
    let authToken: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(authToken);
  }

  registerCard(card: any): Observable<any> {
    const registerCardUrl = this.prepEndpoint('users/card');
    return this.http.post<any>(registerCardUrl, card, httpOptions);
  }

  registerLocation(location: any): Observable<any> {
    const registerLocationUrl = this.prepEndpoint('users/location');
    return this.http.post<any>(registerLocationUrl, location, httpOptions);
  }

  // 사용자의 명함을 읽어오는 함수
  getCard(username: any): Observable<any> {
    const myCardUrl = this.prepEndpoint('users/myCard');
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    return this.http.post<any>(myCardUrl, username, httpOptions1);
  }

  // getLocationData(username: any): Observable<any> {
  //   let authToken: any = localStorage.getItem('authToken');
  //   const httpOptions1 = {
  //     headers: new HttpHeaders({
  //       contentType: 'application/json',
  //       authorization: 'Bearer ' + authToken,
  //     }),
  //   };
  //   const myLocationUrl = this.prepEndpoint('users/myLocation');
  //   return this.http.post<any>(myLocationUrl, username, httpOptions1);
  // }

  getCompanyList(): Observable<any> {
    const companylistUrl = this.prepEndpoint('users/companylist');
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    return this.http.get<any>(companylistUrl, httpOptions1);
  }
}
