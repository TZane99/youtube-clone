import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import './pollyfills'

platformBrowser().bootstrapModule(AppModule, {
  
})
  .catch(err => console.error(err));
