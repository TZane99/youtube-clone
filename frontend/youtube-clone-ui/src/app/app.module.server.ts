import { NgModule } from '@angular/core';
import { App } from './app';
import { AppModule } from './app-module';
import { ServerModule } from '@angular/platform-server';
import { AuthConfigService, AuthService } from '@auth0/auth0-angular';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    // Provide mock implementations for AuthService and AuthConfigService for SSR
    { provide: AuthService, useValue: {} },
    { provide: AuthConfigService, useValue: {} as any },
  ],
  bootstrap: [App], // Assuming AppComponent is your root component
})
export class AppServerModule {}
