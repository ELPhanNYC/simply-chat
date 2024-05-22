import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMessage() {
    return this.http.get('http://localhost:3000/api/getmessage');
  }
  postMessage(data: { alias: string; message: string }) {
    return this.http.post('http://localhost:3000/api/post', data);
  }
}
