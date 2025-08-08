import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { VideoDto } from '../video-dto';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-save-video-details',
  standalone: false,
  templateUrl: './save-video-details.html',
  styleUrl: './save-video-details.css'
})
export class SaveVideoDetails implements OnInit{

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl();
  description: FormControl = new FormControl();
  videoStatus: FormControl = new FormControl();
  videoStatusOptions = [
    { value: "public", viewValue: "Public"},
    { value: "private", viewValue: "Private"}
  ];

  readonly selectable = true;
  readonly removable = true;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags: string[] = [];
  isBrowser: boolean;
  selectedFile!: File;
  selectedFileName: string = '';
  videoId: string = '';
  fileSelected: boolean = false;
  videoUrl!: string;
  thumbnailUrl!: string;
  videoAvailable: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private activatedRoute: ActivatedRoute, private videoService: VideoService, 
              private matSnackBar: MatSnackBar) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data =>{
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
      this.videoAvailable = true;
    });
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus  
    });
  }
  ngOnInit(): void {
    if(this.isBrowser){
      this.videoAvailable;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);
    
    if(index >= 0){
      this.tags.splice(index, 1);
    }
    
  }

  onFileSelected($event: Event){
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;

  }

  onUpload(){
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data =>{
        console.log(data);
        this.matSnackBar.open("Thumbnail uploaded successfully", "OK");
      })
  }

  saveVideo(){
    //Make a call to video service to make http call to backend
    const videoMetadata: VideoDto = {
      "id": this.videoId,
      "title":this.saveVideoDetailsForm.get('title')?.value,
      "description": this.saveVideoDetailsForm.get('description')?.value,
      "tags": this.tags,
      "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value.toUpperCase(),
      "thumbnailUrl": this.thumbnailUrl,
      "videoUrl": this.videoUrl
      
    }

    this.videoService.saveVideo(videoMetadata).subscribe(data =>{
      this.matSnackBar.open("Video Information Updated Successfully", "OK");
    })
  }

}