import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video';
import { SaveVideoDetails } from './save-video-details/save-video-details';
import { LandingPage } from './landing-page/landing-page';
import { VideoDetail } from './video-detail/video-detail';


import { HistoryComponent } from './history/history';
import { SubscriptionsComponent } from './subscriptions/subscriptions';
import { LikedVideosComponent } from './liked-videos/liked-videos';
import { Featured } from './featured/featured';
import { Callback } from './callback/callback';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {
        path: '', component: LandingPage,
        children: [
            {
                path: 'featured', component: Featured,
            },
            {
                path: 'subscriptions', component: SubscriptionsComponent,
            },
            {
                path: 'history', component: HistoryComponent,
            },
            {
                path: 'liked-videos', component: LikedVideosComponent,
            },
        ]
    },
    {
        path: 'upload-video', component: UploadVideoComponent,  
    },
    {
        path: 'save-video-details/:videoId', component: SaveVideoDetails,
    },
    {
        path: 'video-details/:videoId', component: VideoDetail,
    },
    {
        path: 'callback', component: Callback,
    },
    {
        path: 'profile', component: Profile,
    }
];



@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
