import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { VideoService } from '../video.service';
import { AppModule } from '../app-module';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-root',
  standalone: false,
  templateUrl: './upload-video.html',
  styleUrl: './upload-video.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class UploadVideoComponent {

  public files: NgxFileDropEntry[] = [];
  fileUploaded: Boolean = false;
  fileEntry: FileSystemFileEntry | undefined;
  

  constructor(private videoService: VideoService, private router: Router) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          this.fileUploaded = true;
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  uploadVideo() {
    if(this.fileEntry != undefined){

      this.fileEntry.file(file => {
        this.videoService.uploadVideo(file).subscribe(data => {
          this.router.navigateByUrl("/save-video-details/" + data.videoId)
        });
      })

      
    }
  }
}
