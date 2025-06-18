import { Component } from '@angular/core';
import { SearchService } from './search.service';
import {NgOptimizedImage} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {Router} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  constructor(private searchService: SearchService, private router: Router, private sanitizer: DomSanitizer) { }

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

  redirectToVideo(videoUuid: string) {
    console.log(videoUuid);
    this.router.navigate([`/view/${videoUuid}`]);
  }

  getThumbnailSrc(thumbnail: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl('data:image/webp;base64,' + thumbnail);
  }

}
