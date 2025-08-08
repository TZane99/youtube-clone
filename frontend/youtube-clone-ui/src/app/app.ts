import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('youtube-clone-ui');
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private auth: AuthService){
    this.isBrowser = isPlatformBrowser(this.platformId)
    

  }

   ngOnInit() {
       
  }
}
