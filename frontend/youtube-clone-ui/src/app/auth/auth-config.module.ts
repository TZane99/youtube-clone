import { NgModule, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthModule, AuthConfig } from '@auth0/auth0-angular';

@NgModule({
  imports: [
    AuthModule.forRoot({
      domain: 'dev-atwdgfhoqqsj2y2y.us.auth0.com',
      clientId: 'dHei4wUJrUGnEk5ialFbnNn8HGWxS0D0',
      authorizationParams: {
        redirectUri: getSafeRedirectUri(),
        audience: 'http://localhost:8080',  // this must match Auth0 API identifier
        scope: 'openid profile email offline_access',
        prompt: 'consent'
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/api/videos/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'http://localhost:8080',
              },
            },
          },
        ],
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      useRefreshTokensFallback: true
    }),
  ],
})
export class AuthConfigModule {}

function getSafeRedirectUri(): string {
  return typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200';
}
