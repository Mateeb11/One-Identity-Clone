import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  dbValue: string = '';

  constructor(private papa: Papa, private angularFirestore: AngularFirestore) {}

  async getData() {
    const mailBoxQ = query(collection(this.db, 'MailBox'));
    const adsQ = query(collection(this.db, 'ADSAccount'));

    console.log('MailBox Collection\n---------------------');
    const mailBoxSnapshot = await getDocs(mailBoxQ);
    mailBoxSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
    console.log('ADSAccount Collection\n---------------------');
    const adsSnapshot = await getDocs(adsQ);
    adsSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  }

  async setData(writeInputValue: any) {
    const citiesRef = collection(this.db, 'Test');

    await setDoc(doc(citiesRef, 'TestName'), {
      Name: writeInputValue.nativeElement.value,
    });

    console.log(`Write value = ${writeInputValue.nativeElement.value}`);
  }

  public csvConector(file: any): void {
    this.papa.parse(file, {
      skipEmptyLines: true,
      complete: async (result: any) => {
        const mailBoxRef = collection(this.db, 'MailBox');
        const adsRef = collection(this.db, 'ADSAccount');

        // Make all documents "isActive" = FALSE
        const mailBoxSnapshot = await getDocs(query(mailBoxRef));
        mailBoxSnapshot.forEach(async (document) => {
          await updateDoc(doc(mailBoxRef, document.id), {
            isActive: false,
          });
        });

        const adsSnapshot = await getDocs(query(adsRef));
        adsSnapshot.forEach(async (document) => {
          await updateDoc(doc(adsRef, document.id), {
            isActive: false,
          });
        });

        // Add or update firebase documents with csv file data
        result.data.slice(1).forEach(async (user: any) => {
          await setDoc(doc(mailBoxRef, user[0]), {
            isActive: true,
            isCompanyEmployee: user[3] || true,
            quota: user[3] == 'TRUE' ? 5 : 2,
          });

          await setDoc(doc(adsRef, user[0]), {
            isActive: true,
            email: user[2],
            fullName: user[1],
          });
        });
      },
    });
  }
}
