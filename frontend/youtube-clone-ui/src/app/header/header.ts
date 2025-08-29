import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  isAuthenticated: boolean = false;
  isBrowser: boolean = false;
  token: string = '';
  homePages: Array<string> = ["/featured", "/subscriptions", "/history", "/liked-videos"]
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public auth: AuthService, private zone: NgZone, private cd: ChangeDetectorRef,
                      private router: Router){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
    this.auth.isAuthenticated$.pipe(
      filter(authenticated => authenticated === true),
      take(1), 
      switchMap(() => this.auth.getAccessTokenSilently()),
    ).subscribe({
      next: (token) => {
        this.zone.run(() => {
          this.isAuthenticated = true;
          this.token = token;
          this.cd.markForCheck();
          console.log('✅ Access token retrieved:', token);
        });
      },
      error: (err) => {
        console.error('❌ Failed to get token:', err);
      }
    });
  }
  }

  login(): void{
    this.auth.loginWithRedirect({
      authorizationParams: {
      redirect_uri: "http://localhost:4200/callback"
      },
      appState: {
        target: '/featured'
      }
      });
  }

  logout(): void {
    if(this.isBrowser){
      this.auth.logout({ logoutParams:{ returnTo: "http://localhost:4200"} });
    }
  }

  getSafeRedirectUri(): string {
  return typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200/callback';
  }

  navigateToUploadPage(){
    this.router.navigateByUrl("/upload-video");
  }

  navigateHome(){
    if(this.homePages.includes(this.router.url)){
      this.router.navigateByUrl("/featured");
    }else{
      this.router.navigateByUrl("");
    }  
  }

  navigateToProfilePage(){
    console.log("Test123")
    this.router.navigateByUrl("/profile")
  }

}
