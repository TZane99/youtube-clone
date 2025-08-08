import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video';
import { SaveVideoDetails } from './save-video-details/save-video-details';
import { LandingPage } from './landing-page/landing-page';
import { VideoDetail } from './video-detail/video-detail';

export const routes: Routes = [
    {
        path: '', component: LandingPage,
    },
    {
        path: 'upload-video', component: UploadVideoComponent,  
    },
    {
        path: 'save-video-details/:videoId', component: SaveVideoDetails,
    },
    {
        path: 'video-details/:videoId', component: VideoDetail,
    }
];



@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
