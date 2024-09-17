import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
   private app = initializeApp(environment.firebaseConfig);
   private db = getFirestore(this.app);
   private dbValue:string=''

  constructor() { }

  async getData() {
    const docRef = doc(this.db, 'Test', 'TestName');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      this.dbValue = docSnap.data()['Name'];
    } else {
      console.log('No such document!');
    }
  }


  async setData(writeInputValue:any) {
    const citiesRef = collection(this.db, 'Test');

    await setDoc(doc(citiesRef, 'TestName'), {
      Name: writeInputValue.nativeElement.value,
    });

    console.log(`Write value = ${writeInputValue.nativeElement.value}`);
  }


}
