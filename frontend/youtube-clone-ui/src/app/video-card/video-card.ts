import { Component, Input, OnInit } from '@angular/core';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-video-card',
  standalone: false,
  templateUrl: './video-card.html',
  styleUrl: './video-card.css'
})
export class VideoCard implements OnInit{

  @Input()
  video!: VideoDto;

  constructor(){

  }

  ngOnInit(): void {
      
  }

}
