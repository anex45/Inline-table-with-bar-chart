import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Import the standalone AppComponent

bootstrapApplication(AppComponent).catch(err => console.error(err));  // Bootstrap the standalone component
