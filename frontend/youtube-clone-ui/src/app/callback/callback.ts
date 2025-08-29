import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: false,
  templateUrl: './callback.html',
  styleUrl: './callback.css'
})
export class Callback implements OnInit{

  constructor(private userService: User, private router: Router, private auth: AuthService,  @Inject(PLATFORM_ID) private platformId: Object,) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.userService.registerUser();
      this.router.navigateByUrl('');
    }
    }
}
