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
} from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Papa } from 'ngx-papaparse';
import { ADAccountInterface } from '../../features/admin/models/adAccount.interface';
import { MailBoxInterface } from '../../features/admin/models/mailBox.interface';

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
      complete: async (result: any) => {
        const mailBoxRef = collection(this.db, 'MailBox');
        const adsRef = collection(this.db, 'ADSAccount');

        for (let i = 1; i < result.data.length; i++) {
          await setDoc(doc(mailBoxRef, result.data[i][0]), {
            isActive: result.data[i][4] || true,
            isCompanyEmployee: result.data[i][3] || true,
            quota: result.data[i][3] == 'TRUE' ? 5 : 2,
          });

          await setDoc(doc(adsRef, result.data[i][0]), {
            isActive: result.data[i][4] || true,
            email: result.data[i][2],
            fullName: result.data[i][1],
          });
        }
      },
    });
  }
}
