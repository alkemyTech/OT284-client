import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  register(name:string,email:string,password: string): Observable<any>{
    const body ={
      name: name,
      email: email,
      password: password
    };
    return this.http.post("https://ongapi.alkemy.org/api/register", body, {headers: this.httpHeaders});
  }

  login(email:string,password:string){
    const body = {
      email: email,
      password: password
    };
    return this.http.post("https://ongapi.alkemy.org/api/login", body, {headers: this.httpHeaders});
  }
}
