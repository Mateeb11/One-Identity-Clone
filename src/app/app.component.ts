import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from 'firebase/firestore';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'one-identity-clone';

  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: 'AIzaSyBWEOvUscWifCIVFs8dw96q0C4t1Hb95KY',
    authDomain: 'one-identity-clone.firebaseapp.com',
    projectId: 'one-identity-clone',
    storageBucket: 'one-identity-clone.appspot.com',
    messagingSenderId: '603658530826',
    appId: '1:603658530826:web:7e9de1bc7f44cce914eff3',
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);

  dbValue = '';

  async getData() {
    const docRef = doc(this.db, 'Test', 'TestName');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      this.dbValue = docSnap.data()['Name'];
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  @ViewChild('writeInputValue') writeInputValue!: ElementRef;

  async setData() {
    const citiesRef = collection(this.db, 'Test');

    await setDoc(doc(citiesRef, 'TestName'), {
      Name: this.writeInputValue.nativeElement.value,
    });

    console.log(`Write value = ${this.writeInputValue.nativeElement.value}`);
  }
}
