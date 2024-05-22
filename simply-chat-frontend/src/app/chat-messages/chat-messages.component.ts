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

  messages: any = [];
  interval:any;

  constructor(private apiService: ApiService){
    
  }

  ngOnInit() {
    // Fetch messages initially
    this.fetchMessages();

    // Set interval to fetch messages every 10 seconds
    this.interval = setInterval(() => {
      this.fetchMessages();
    }, 3000); // 10 seconds
  }

  ngOnDestroy() {
    // Clear the interval when component is destroyed
    clearInterval(this.interval);
  }

  fetchMessages() {
    this.apiService.getMessage()
      .subscribe(data => {
        this.messages = data;
      });
  }
}
