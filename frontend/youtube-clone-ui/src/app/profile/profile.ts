import {  ChangeDetectorRef, Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../user';
import { UserDto } from '../user-dto';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, last } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{

  userDetails: UserDto | null = null;
  hasChannelName: boolean = true;
  duration: string = '1000';
  firstTimeUser: boolean = false;
  column_def: string[] = [];
  table_data: any[] = [];
  userVideos: Array<VideoDto> = [];
  loading: boolean = true;

  private _formBuilder = inject(FormBuilder);

  channelFormGroup: FormGroup = this._formBuilder.group({channelName: ['']});
  nameFormGroup: FormGroup = this._formBuilder.group({firstName: [''], lastName: ['']});
  addressFormGroup: FormGroup = this._formBuilder.group({address: ['']});
  phoneNumberFormGroup: FormGroup = this._formBuilder.group({phoneNumber: ['']});

  constructor(private userService: User,  @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef, private videoService: VideoService) {}

async ngOnInit(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    try {
      const data = await firstValueFrom(this.userService.getUserDetails());
      this.userDetails = data;
      this.firstTimeUser = this.userDetails.firstTimeUser;
      if(!this.firstTimeUser){
        this.column_def = ["label", "value"];
        let fullName = this.userDetails.firstName + " " + this.userDetails.lastName;
        this.table_data = [
          {label: 'Name:', value: fullName},
          {label: 'Address:', value: this.userDetails.address},
          {label: 'Phone Number:', value: this.userDetails.phoneNumber}
        ]
      }
    } catch (err) {
      console.error("Error fetching user details", err);
    }
  }
}

  async updateFirstTimeUser(){
    let userId = this.userService.getUserId();
    let channelName = this.channelFormGroup.get('channelName')?.value as string;
    let firstName = this.nameFormGroup.get('firstName')?.value as string;
    let lastName = this.nameFormGroup.get('lastName')?.value as string;
    let address = this.addressFormGroup.get('address')?.value as string;
    let phoneNumber = this.phoneNumberFormGroup.get('phoneNumber')?.value as string;
    let userDto: UserDto = {
      'channelName': channelName,
      'lastName': lastName,
      'address': address,
      'firstName': firstName,
      'phoneNumber': phoneNumber,
      'sub': this.userDetails!.sub,
      'nickname': this.userDetails!.nickname,
      'id': this.userDetails!.id,
      'fullName': firstName + " " + lastName,
      'email': this.userDetails!.email,
      'picture': this.userDetails!.picture,
      'firstTimeUser': false
    }

    try{
      const data = await firstValueFrom(this.userService.updateFirstTimeUser(userId, userDto));
      this.userDetails!.channelName = channelName;
      this.userDetails!.firstName = firstName;
      this.userDetails!.firstName = lastName;
      this.userDetails!.fullName = firstName + " " + lastName;
      this.userDetails!.address = address;
      this.userDetails!.phoneNumber = phoneNumber;
      this.firstTimeUser = false;
      this.cdr.detectChanges();
    }catch (err){
      console.error("Error updating channel name", err); 
    }
  }

  async loadVideos() {
    this.loading = true;
    let userId = this.userService.getUserId();
    try{
      this.userVideos = await firstValueFrom(this.videoService.getAllVideosByUserId(userId));
      this.loading = false;
    }catch (err){
      console.error('Error loading videos', err);
      this.loading = false;
    }
    this.cdr.detectChanges();
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        break;
      case 1:
        if (isPlatformBrowser(this.platformId)) {
          this.loadVideos();
        }
        break;
      case 2:
        break;
    }
  }

}
