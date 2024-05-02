import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { myAppModule } from './app/myapp.modul';

platformBrowserDynamic().bootstrapModule(myAppModule).catch((err: any) => console.error(err));
