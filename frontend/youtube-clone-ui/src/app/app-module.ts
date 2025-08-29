import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UploadVideoComponent } from './upload-video/upload-video';
import { MatButtonModule } from  '@angular/material/button';
import { Header } from './header/header';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SaveVideoDetails } from './save-video-details/save-video-details';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { VideoPlayer } from './video-player/video-player';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { LandingPage } from './landing-page/landing-page'
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AuthConfigModule } from './auth/auth-config.module';
import { VideoDetail } from './video-detail/video-detail';
import { HistoryComponent } from './history/history';
import { SubscriptionsComponent } from './subscriptions/subscriptions';
import { Sidebar } from './sidebar/sidebar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { LikedVideosComponent } from './liked-videos/liked-videos';
import { VideoCard } from './video-card/video-card';
import {MatCardModule} from '@angular/material/card';
import { Featured } from './featured/featured';
import { Callback } from './callback/callback';
import { Comments } from './comments/comments';
import {MatMenuModule} from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Profile } from './profile/profile';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    App,
    UploadVideoComponent,
    Header,
    SaveVideoDetails,
    VideoPlayer,
    LandingPage,
    VideoDetail,
    HistoryComponent,
    SubscriptionsComponent,
    LikedVideosComponent,
    Sidebar,
    Featured,
    VideoCard,
    Callback,
    Comments,
    Profile
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxFileDropModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    FlexLayoutServerModule,
    AuthConfigModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    
  ],
  bootstrap: [App]
})
export class AppModule { }
