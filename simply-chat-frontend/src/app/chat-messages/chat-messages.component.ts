import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  providers: []
})
export class ChatMessagesComponent  implements OnInit { 

  message: any;

  readonly ApiUrl = "http://localhost:3000/api/message";

  constructor(private apiService: ApiService) { }; 

  ngOnInit() { 
      this.apiService.getMessage().subscribe(data => { 
          this.message = data; 
      }); 
  } 
}
