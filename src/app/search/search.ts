import { Component } from '@angular/core';
import { SearchService } from './search.service';
import {NgOptimizedImage} from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search',
  imports: [
    NgOptimizedImage,
    MatCardModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  videos: any;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.searchVideos().subscribe({
      next: (data: any) => {
        console.log(data);
        this.videos = data.message;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
