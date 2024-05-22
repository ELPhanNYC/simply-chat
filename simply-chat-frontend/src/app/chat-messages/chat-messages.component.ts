import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  providers: []
})
export class ChatMessagesComponent implements OnInit, OnDestroy, AfterViewChecked {

  messages: any = [];
  interval: any;

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchMessages();
    this.interval = setInterval(() => {
      this.fetchMessages();
    }, 3000); // 3 seconds
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  fetchMessages() {
    this.apiService.getMessage().subscribe(data => {
      this.messages = data;
    });
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
