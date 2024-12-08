import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pwaApp';
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('User data fetched successfully:', data);
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
      complete: () => {
        console.log('User data fetch completed.');
      },
    });
  }
}
