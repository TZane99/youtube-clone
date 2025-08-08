import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';
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
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public auth: AuthService, private zone: NgZone, private cd: ChangeDetectorRef){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
    this.auth.isAuthenticated$.pipe(
      filter(authenticated => authenticated === true), // only proceed if authenticated
      take(1), // only respond to first "true"
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
        redirect_uri: this.getSafeRedirectUri()
        }
      });
  }

  logout(): void {
    if(this.isBrowser){
      this.auth.logout({ logoutParams:{ returnTo: this.getSafeRedirectUri()} });
    }
  }

  getSafeRedirectUri(): string {
  return typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200';
}

}
