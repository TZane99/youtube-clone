import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { VideoService } from '../video.service';
import { VideoDto } from '../video-dto';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-featured',
  standalone: false,
  templateUrl: './featured.html',
  styleUrl: './featured.css',
})
export class Featured implements OnInit{

  featuredVideos: Array<VideoDto> = [];
  loading!: boolean;

  constructor(private videoService: VideoService, @Inject(PLATFORM_ID) private platformId: Object, private auth: AuthService, private cdr: ChangeDetectorRef){
    console.log("featured page");

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.isAuthenticated$.subscribe(isAuth => {
        if (isAuth) {
          this.loadVideos();
        }
      });
    }
    
  }

  async loadVideos() {
    this.loading = true;

    try{
      this.featuredVideos = await firstValueFrom(this.videoService.getAllVideos());
      this.loading = false;
    }catch (err){
      console.error('Error loading videos', err);
      this.loading = false;
    }
    this.cdr.detectChanges();
  }
  
}


