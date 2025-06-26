import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastService} from '../toast/toast.service';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';

@Component({
  selector: 'app-search',
  imports: [
    MatCardModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  page = 1;
  loading = false;
  videos: any[] = [];
  hasMore = true;

  constructor(private searchService: SearchService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.page = 1;
    this.getVideos(false);
  }

  getVideos(append = false) {
    this.loading = true;
    this.route.queryParams.subscribe((params) => {
      const searchTerms = params['search'] || '';
      this.searchService.searchVideos(searchTerms, this.page).subscribe({
        next: (data: any) => {
          const results = data.message || [];
          if (results.length < this.page) {
            this.hasMore = false;
          }

          this.videos = append ? [...this.videos, ...results] : results;
          this.loading = false;
        },
        error: (err: any) => {
          this.toastService.openSnackBar(err.error.message);
          this.loading = false;
        }
      });
    });
  }


  redirectToVideo(videoUuid: string) {
    console.log(videoUuid);
    this.router.navigate([`/view/${videoUuid}`]);
  }

  getThumbnailSrc(thumbnail: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/webp;base64,' + thumbnail);
  }

  onScroll() {
    if (this.loading) return;
    this.page++;
    this.getVideos(true);
  }

  trackByUuid(index: number, video: any) {
    return video.uuid;
  }
}
