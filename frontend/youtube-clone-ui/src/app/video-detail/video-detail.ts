import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { AuthService } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-video-detail',
  standalone: false,
  templateUrl: './video-detail.html',
  styleUrl: './video-detail.css'
})
export class VideoDetail implements OnInit{

  videoId!: string;
  videoUrl!: string;
  videoTitle!: string;
  videoDesc!: string;
  videoTags: Array<string> = [];
  videoAvailable!: boolean;
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;
  showSubscribeButton: boolean = true;
  showUnsubscribeButton: boolean = false;
  

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private auth: AuthService, 
                      @Inject(PLATFORM_ID) private platformId: Object, private userService: User){
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.isAuthenticated$.subscribe(isAuth => {
        if (isAuth) {
          this.getVideo();
        }
      });
    }
    
  }

  async getVideo() {
  this.videoAvailable = false;
  try {
    const data = await firstValueFrom(this.videoService.getVideo(this.videoId));
    this.videoUrl = data.videoUrl;
    this.videoTitle = data.title;
    this.videoDesc = data.description;
    this.videoTags = data.tags;
    this.likeCount = data.likeCount;
    this.dislikeCount = data.dislikeCount;
    this.viewCount = data.viewCount;
    this.videoAvailable = true;
    
  } catch (error) {
    console.error('Error getting video', error);
    }
  }

  async likeVideo(){
    try{
      const data = await firstValueFrom(this.videoService.likeVideo(this.videoId));
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    }catch (err){
      console.error('Error liking video', err);
    }
  }

  async dislikeVideo(){
    try{
      const data = await firstValueFrom(this.videoService.dislikeVideo(this.videoId));
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
    }catch (err){
      console.error('Error liking video', err);
    }
  }

  async subscribeToUser(){
    let userId = this.userService.getUserId();
    try{
      await firstValueFrom(this.userService.subscribeToUser(userId));
      this.showSubscribeButton = false;
      this.showUnsubscribeButton = true;
    }catch (err){
      console.error('Error subscrubing to user', err);
    }
  }

  async unsubscribeToUser(){
    let userId = this.userService.getUserId();
    try{
      await firstValueFrom(this.userService.unsubscribeToUser(userId));
      this.showSubscribeButton = true;
      this.showUnsubscribeButton = false;
    }catch (err){
      console.error('Error subscrubing to user', err);
    }
  }
}
