import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {
  private REST_API_SERVER = "http://localhost:3000";
  constructor( private httpClient: HttpClient) { }

  getTickers(date:number) {    
    return this.httpClient.get(`${this.REST_API_SERVER}/${date}`);
  }
}
