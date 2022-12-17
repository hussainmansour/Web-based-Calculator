import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {


  private url1 = 'http://localhost:9090/getResult';
  private url2 = 'http://localhost:9090/getValue';

  constructor(private http:HttpClient) { }

  public getResult(data : string) : Observable<string> {
    return this.http.post<string>(this.url1,data);
  }

  public getRec(data : string) : Observable<string> {
    return this.http.post<string>(this.url2,data);
  }

}
