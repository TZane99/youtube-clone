import { Component, inject, signal } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-video-details',
  standalone: false,
  templateUrl: './save-video-details.html',
  styleUrl: './save-video-details.css'
})
export class SaveVideoDetails {

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
  selectedFile!: File;
  selectedFileName: string = '';
  videoId: string = '';
  fileSelected: boolean = false;

  constructor(private activatedRouter: ActivatedRoute, private videoService: VideoService, 
              private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRouter.snapshot.params['videoId'];
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus   
    });
  }

  noOnInit(): void {}

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

}

