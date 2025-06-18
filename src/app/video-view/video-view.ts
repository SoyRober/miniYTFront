import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoViewService } from './video-view.service';
import {MatExpansionModule} from '@angular/material/expansion';

export interface VideoDetails {
  uuid: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-video-view',
  imports: [MatExpansionModule],
  templateUrl: './video-view.html',
  styleUrl: './video-view.css'
})
export class VideoView {
  videoPath?: string;
  videoDetails?: VideoDetails;
  uuid?: string | null;

  constructor(private router: ActivatedRoute, private videoViewService: VideoViewService) {}

  ngOnInit() {
    this.videoStream();

    this.getVideoDetails();
  }

  getVideoDetails() {
    this.videoViewService.getVideo(this.uuid).subscribe({
      next: (response) => {
        this.videoDetails = response.message;
      },
      error: (error) => {
        console.error('Error fetching video details:', error);
      }
    });
  }

  videoStream() {
    this.uuid = this.router.snapshot.paramMap.get('videoUuid');

    if (this.uuid) {
      this.videoPath = `http://localhost:8080/public/video/stream/${this.uuid}`;
    } else {
      console.error('Video path not found in route parameters.');
    }
  }

}
