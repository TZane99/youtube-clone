import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-video-player',
  standalone: false,
  templateUrl: './video-player.html',
  styleUrl: './video-player.css'
})
export class VideoPlayer implements OnInit{
  isBrowser: boolean;

  @Input() videoUrl: string = '';
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId);
    
  }

  ngOnInit(): void{
  }

}
