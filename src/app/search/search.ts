import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastService} from '../toast/toast.service';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';

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
  page = 0;
  loading = false;
  videos: any[] = [];
  hasMore = true;
  searchTerms = '';
  private queryParamsSub: Subscription | undefined;

  constructor(private searchService: SearchService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.searchTerms = params['search'] || '';
      this.page = 0;
      this.hasMore = true;
      this.getVideos(false);
    });
  }

  ngOnDestroy() {
    this.queryParamsSub?.unsubscribe();
  }

  getVideos(append = false) {
    this.loading = true;

    this.searchService.searchVideos(this.searchTerms, this.page).subscribe({
      next: (data: any) => {
        const results = data.message || [];
        console.log(data);
        this.hasMore = results.length > 0;
        this.videos = append ? [...this.videos, ...results] : results;
        this.loading = false;
      },
      error: (err: any) => {
        this.toastService.openSnackBar(err.error.message);
        this.loading = false;
      },
      complete: () => this.loading = false,
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
    if (this.loading || !this.hasMore) return;
    console.log("scroll event triggered");
    this.page++;
    this.getVideos(true);
  }
}
