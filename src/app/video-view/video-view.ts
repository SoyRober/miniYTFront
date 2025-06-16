import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-view',
  imports: [],
  templateUrl: './video-view.html',
  styleUrl: './video-view.css'
})
export class VideoView {
  videoPath?: string;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    const param = this.router.snapshot.paramMap.get('videoUuid');
    if (param) {
      console.log(param);
      this.videoPath = `http://localhost:8080/public/video/stream/${param}`;
    } else {
      console.error('Video path not found in route parameters.');
    }
  }

}
