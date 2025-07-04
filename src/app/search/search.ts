import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastService} from '../toast/toast.service';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Loading} from '../component/loading/loading';
import {NoContent} from '../component/no-content/no-content';

@Component({
  selector: 'app-search',
  imports: [
    MatCardModule,
    InfiniteScrollDirective,
    MatProgressSpinner,
    Loading,
    NoContent,
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
  noResultsFound = false;

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
      this.videos = [];
      this.hasMore = true;
      this.noResultsFound = false;
      this.getVideos(false);
    });
  }

  ngOnDestroy() {
    this.queryParamsSub?.unsubscribe();
  }

  getVideos(append = false) {
    if (this.loading) return;

    if (append && !this.hasMore) {
      console.log("No more results to load for append.");
      this.toastService.openSnackBar('No more results');
      return;
    }

    this.loading = true;
    this.noResultsFound = false;

    this.searchService.searchVideos(this.searchTerms, this.page).subscribe({
      next: (data: any) => {
        if (data.success) {
          const results = data.message || [];
          console.log("API Response Data (success):", data);

          this.hasMore = results.length > 0;

          if (!append && results.length === 0) {
            this.noResultsFound = true;
            this.videos = [];
          } else {
            this.videos = append ? [...this.videos, ...results] : results;
          }
        } else {
          console.warn("API Response Data (failure):", data.message);
          this.toastService.openSnackBar(data.message || 'An error occurred while fetching videos.');
          this.hasMore = false;
          if (!append) {
            this.noResultsFound = true;
            this.videos = [];
          }
        }

        this.loading = false;
      },
      error: (err: any) => {
        this.toastService.openSnackBar(err.error.message);
        this.loading = false;
        if (!append && this.videos.length === 0) this.noResultsFound = true;
      },
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
