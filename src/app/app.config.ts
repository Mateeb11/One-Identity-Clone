import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireAuthModule} from '@angular/fire/compat/auth'
import {AngularFireDatabaseModule} from '@angular/fire/compat/database'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { routes } from './app.routes';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ])
  ],
};
