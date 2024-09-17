import {
  ApplicationConfig,
  // importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
// import {initializeApp, provideFirebaseApp} from '@angular/fire/app'
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import {  } from 'firebase/firestore';
// import{getFirestore,provideFirestore} from '@angular/fire/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBWEOvUscWifCIVFs8dw96q0C4t1Hb95KY',
  authDomain: 'one-identity-clone.firebaseapp.com',
  projectId: 'one-identity-clone',
  storageBucket: 'one-identity-clone.appspot.com',
  messagingSenderId: '603658530826',
  appId: '1:603658530826:web:7e9de1bc7f44cce914eff3',
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // importProvidersFrom(
    //   [
    //     provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    //     provideFirestore(()=>getFirestore())


    //   ]),
  ],
};
