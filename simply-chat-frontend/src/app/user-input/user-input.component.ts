import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  alias: string = '';
  message: string = '';

  constructor(private apiService: ApiService) {}

  postToDB() {
    const payload = {
      alias: this.alias,
      message: this.message
    };

    this.apiService.postMessage(payload)
      .subscribe(response => {
        console.log('Response from server:', response);
        this.message = '';
      }, error => {
        console.error('Error:', error);
      });
  }
}
