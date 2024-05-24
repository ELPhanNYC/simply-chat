import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMessage() {
    return this.http.get('https://whale-app-vwzos.ondigitalocean.app/api/getmessage');
  }
  postMessage(data: { alias: string; message: string }) {
    return this.http.post('https://whale-app-vwzos.ondigitalocean.app/api/post', data);
  }
}
