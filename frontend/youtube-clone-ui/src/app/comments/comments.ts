import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { CommentsService } from '../comments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentsDto } from '../comment-dto';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments implements OnInit{

  @Input()
  videoId: string = '';
  commentsForm: FormGroup;
  commentsDto: CommentsDto[] = [];

  constructor(private userService: User, private commentSerivce: CommentsService,
                       private matSnackBar: MatSnackBar, @Inject(PLATFORM_ID) private platformId: Object){
    this.commentsForm = new FormGroup({
      comment: new FormControl(''),
    });
  }

  async ngOnInit(): Promise<void> {
    
    this.getComments();

  }

  postComment(){
     if (isPlatformBrowser(this.platformId)) {
      const comment = this.commentsForm.get('comment')?.value;
      console.log(comment);
      const commentDto = {
        "text": comment,
        "authorId": this.userService.getUserId(),
        "likeCount": 0,
        "disLikeCount": 0
      }
      console.log(commentDto);

      this.commentSerivce.postComment(commentDto, this.videoId).subscribe(() =>{
        this.matSnackBar.open("Comment Posted Successfully", "OK");
        this.commentsForm.get('comment')?.reset();
        this.getComments();
      });      
     }
  }

  async getComments(){
    if (isPlatformBrowser(this.platformId)) {
      try{
        const data = await firstValueFrom(this.commentSerivce.getAllComments(this.videoId));
        this.commentsDto = data;
        console.log(this.commentsDto);
      }catch (err){
        console.error("Error getting all comments", err);
      }
     }
  }

}
