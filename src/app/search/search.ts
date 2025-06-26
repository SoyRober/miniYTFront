import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastService} from '../toast/toast.service';

@Component({
  selector: 'app-search',
  imports: [
    MatCardModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  videos: any;

  constructor(private searchService: SearchService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private toastService: ToastService) {}

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const searchTerms = params['search'] || '';
      this.searchService.searchVideos(searchTerms).subscribe({
        next: (data: any) => {
          this.toastService.openSnackBarSuccess('Videos found!');
          this.videos = data.message;
        },
        error: (err: any) => {
          this.toastService.openSnackBar(err.error.message);
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

}
