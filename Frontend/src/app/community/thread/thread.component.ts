import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent implements OnInit {
  thread: any;
  title: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title'];
      this.getThreadDetails();
      
    });
  }

  getThreadDetails() {
    const url = `http://localhost:4000/api/form/get/${encodeURIComponent(this.title)}`;

    this.http.get(url).subscribe( 
      (data: any) => {
        this.thread = data;
        
      },
      error => {
        console.error('Error fetching anime details:', error);
      }
    );

  }

}
