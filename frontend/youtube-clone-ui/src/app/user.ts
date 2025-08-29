import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UserDto } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class User {

  private userId: string = '';

  constructor(private httpClient: HttpClient) { }

  async registerUser(){
    const data = await firstValueFrom(this.httpClient.get("http://localhost:8080/api/user/register", {
      responseType: 'text'
    }
    ));
    this.userId = data;
  }

  getUserId(): string{
    return this.userId;
  }

  getUserDetails(): Observable<UserDto>{
    return this.httpClient.get<UserDto>("http://localhost:8080/api/user/details");
  }

  subscribeToUser(userId: string): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/subscribe/"+userId, null);
  }

  unsubscribeToUser(userId: string): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/unSubscribe/"+userId, null);
  }

  updateFirstTimeUser(userId: string, newUserArr: UserDto): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/"+userId+"/update/channelname", newUserArr);
  }
  
}
