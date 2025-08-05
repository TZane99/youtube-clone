import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video';
import { SaveVideoDetails } from './save-video-details/save-video-details';

export const routes: Routes = [
    {
        path: 'upload-video', component: UploadVideoComponent,  
    },
    {
        path: 'save-video-details/:videoId', component: SaveVideoDetails,
    }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
