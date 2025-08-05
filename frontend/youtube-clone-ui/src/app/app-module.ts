import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    App,
    UploadVideoComponent,
    Header,
    SaveVideoDetails,
    VideoPlayer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxFileDropModule,
    CommonModule,
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
    MatSnackBarModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
